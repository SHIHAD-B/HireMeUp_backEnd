import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { generateOtp } from "../../utils/otp/generateOtp";
import { sendOtp } from "../../utils/otp/sentOtp";
import ErrorResponse from "../../utils/error/errorResponse";
import { emailValidation } from "../../utils/validation/emailValidation";
import RabbitMQClient from "../../infrastructure/rabbitmq/client";


/**
 * forgotController - Handles the forgot password process.
 * 
 * This controller:
 * 1. Validates the request data using emailValidation.
 * 2. Checks if the user exists using emailExistUseCase.
 * 3. If the user does not exist:
 *    - Returns an error response indicating the user is not found.
 * 4. If no OTP is provided:
 *    - Generates an OTP.
 *    - Sends the OTP to the user's email via RabbitMQ.
 *    - Returns a success response indicating the OTP was sent.
 * 5. If an OTP is provided:
 *    - Verifies the OTP using verifyOtpUseCase.
 *    - Returns a success response if the OTP is verified.
 *    - Returns an error response if the OTP is incorrect.
 */


export const forgotController = (dependencies: IDependencies) => {
    const { useCases: { emailExistUseCase, verifyOtpUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { error, value } = emailValidation.validate(req.body);

            if (error) {
                return next(ErrorResponse.conflict(error.message));
            }

            const { email, otp } = value;
            const userExist = await emailExistUseCase(dependencies).execute({email:email});

            if (!userExist) {
                return next(ErrorResponse.badRequest("User not found"));
            }

            if (!otp) {
                const generatedOtp = await generateOtp();

                if (!generatedOtp) {
                    return next(ErrorResponse.internalError("Failed to generate OTP"));
                }

                const otpData = {
                    email,
                    otp: generatedOtp
                };

                const client = await RabbitMQClient.getInstance();
                const result = await client.produce(otpData, "addOtp", "toUser");

                if (!result) {
                    return next(ErrorResponse.internalError("Failed to send OTP"));
                }

                await sendOtp(email, generatedOtp);
                return res.status(200).send({
                    success: true,
                    user: { email: email },
                    message: 'An OTP has been sent to the email'
                });
            } else {
                const otpVerification = await verifyOtpUseCase(dependencies).execute(email, otp);

                if (!otpVerification) {
                    return next(ErrorResponse.unauthorized("Incorrect OTP"));
                }

                return res.status(200).send({
                    success: true,
                    data: userExist,
                    message: "OTP verified"
                });
            }
        } catch (error) {
            next(error);
        }
    };
};

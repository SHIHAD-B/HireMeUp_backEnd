import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { generateOtp } from "../../utils/otp/generateOtp";
import { sendOtp } from "../../utils/otp/sentOtp";
import ErrorResponse from "../../utils/error/errorResponse";
import { emailValidation } from "../../utils/validation/emailValidation";
import RabbitMQClient from "../../infrastructure/rabbitmq/client";

export const companyForgotController = (dependencies: IDependencies) => {
    const { useCases: { companyEmailExistUseCase, verifyOtpUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { error, value } = emailValidation.validate(req.body);

            if (error) {
                return next(ErrorResponse.conflict(error.message));
            }

            const { email, otp } = value;
            const userExist = await companyEmailExistUseCase(dependencies).execute(email);


            if (!userExist) {
                return next(ErrorResponse.badRequest("company not found"));
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
                    user: userExist,
                    message: "OTP verified"
                });
            }
        } catch (error) {
            next(error);
        }
    };
};

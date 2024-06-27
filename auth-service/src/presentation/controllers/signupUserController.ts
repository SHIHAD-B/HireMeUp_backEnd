import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { generateOtp } from "../../utils/otp/generateOtp";
import { sendOtp } from "../../utils/otp/sentOtp";
import { hashPassword } from "../../utils/hash/hashpassword";
import ErrorResponse from "../../utils/error/errorResponse";
import { signupValidation } from "../../utils/validation/signupValidation";
import RabbitMQClient from "../../infrastructure/rabbitmq/client";
import { generateAccessToken } from "../../utils/generateToken/accessToken";
import { IUsersResult } from "../../domain/entities";

/**
 * signupGoogleController - Handles user sign-up/sign-in using Google OAuth process.
 * 
 * This controller:
 * 1. Decodes the JWT credentials from the request body.
 * 2. Checks if the user's email already exists using emailExistUseCase.
 * 3. If the user's email exists:
 *    - Checks if the user is blocked or deleted by admin and returns an error if true.
 *    - Generates an access token and sets it in an HTTP-only cookie.
 *    - Returns a success response with the existing user's details.
 * 4. If the user's email doesn't exist:
 *    - Generates a random password for the user.
 *    - Hashes the generated password.
 *    - Creates a new user using signupUserUseCase with the provided Google credentials.
 *    - Returns an error response if failed to hash the password or add the user.
 *    - Generates an access token for the new user and sets it in an HTTP-only cookie.
 *    - Returns a success response with the new user's details.
 * 5. Returns an error response if the user's email is not found in the JWT credentials.
 */


export const signupUserController = (dependencies: IDependencies) => {
    const { useCases: { signupUserUseCase, emailExistUseCase, verifyOtpUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { value, error } = signupValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {
                const data = {
                    email: value.email,
                    phone: value.phone
                }
                const userExist: IUsersResult | boolean | null = await emailExistUseCase(dependencies).execute(data)
                if (typeof userExist !== 'boolean' && userExist !== null) {

                    let emailerr = ""
                    let phoneerr = ""
                    if (userExist?.email == value.email) {
                        emailerr = "user already exists"
                    }
                    if (userExist?.phone == value.phone) {
                        phoneerr = "number already used"
                    }
                    return next(ErrorResponse.conflict(emailerr + phoneerr))
                }

                if (!value?.otp) {
                    const otp = await generateOtp()
                    if (otp) {
                        const otpData = {
                            email: data.email,
                            otp: otp
                        }
                        const client = await RabbitMQClient.getInstance();
                        const result = await client.produce(otpData, "addOtp", "toUser");
                        if (result) {

                            await sendOtp(data?.email, otp).then((response) => {

                                return res.status(200).send({
                                    success: true,
                                    user: value,
                                    message: 'An Otp has been sent to the email'
                                })
                            })
                        }
                    }
                } else {
                    const otpVerfication = await verifyOtpUseCase(dependencies).execute(data.email, value?.otp)

                    if (!otpVerfication) {
                        return next(ErrorResponse.unauthorized("incorrect otp"))
                    }

                    const password = await hashPassword(value.password)
                    if (!password) {
                        return next(ErrorResponse.forbidden('password required'))
                    } else {
                        value.password = password
                    }

                    const user = await signupUserUseCase(dependencies).execute(value)
                    if (!user) {
                        return next(ErrorResponse.notFound('failed to add user'))
                    }
                    const accessToken = await generateAccessToken(user)
                    res.cookie('user_token', accessToken, {
                        httpOnly: true
                    })
                    return res.status(200).send({
                        success: true,
                        user: user,
                        message: "user signed in"

                    })
                }

            }

        }

        catch (error) {
            next(error)

        }
    }
}
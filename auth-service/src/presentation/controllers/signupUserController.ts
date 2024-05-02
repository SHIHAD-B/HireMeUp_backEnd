import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { generateOtp } from "../../utils/otp/generateOtp";
import { sendOtp } from "../../utils/otp/sentOtp";
import { hashPassword } from "../../utils/hash/hashpassword";
import ErrorResponse from "../../utils/error/errorResponse";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig/config";
import { signupValidation } from "../../utils/validation/signupValidation";
import RabbitMQClient from "../../infrastructure/rabbitmq/client";

export const signupUserController = (dependencies: IDependencies) => {
    const { useCases: { signupUserUseCase, emailExistUseCase, verifyOtpUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = signupValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {
                const data = value
                const userExist = await emailExistUseCase(dependencies).execute(data?.email)
                if (userExist) {
                    return next(ErrorResponse.conflict("user already exists"))
                }

                if (!data?.otp) {
                    const otp = await generateOtp()
                    if (otp) {
                        const otpData={
                            email:data.email,
                            otp:otp
                        }
                        const client = await RabbitMQClient.getInstance();
                        const result = await client.produce(otpData, "addOtp","toUser");
                        if(result){

                            await sendOtp(data?.email, otp).then((response) => {
                                console.log(response)
                                return res.status(200).send({
                                    message: 'An Otp has been sent to the email'
                                })
                            })
                        }
                    }
                } else {
                    const otpVerfication = await verifyOtpUseCase(dependencies).execute(data.email, data?.otp)

                    if (!otpVerfication) {
                        return next(ErrorResponse.unauthorized("incorrect otp"))
                    }

                    const password = await hashPassword(data.password)
                    if (!password) {
                        return next(ErrorResponse.forbidden('password required'))
                    } else {
                        data.password = password
                    }

                    const user = await signupUserUseCase(dependencies).execute(data)
                    if (!user) {
                        return next(ErrorResponse.notFound('failed to add user'))
                    }
                    const payload = {
                        _id: String(user._id),
                        email: user.email,
                        role: user.role!
                    }
                    const accessToken = Jwt.sign(payload, String(JWT_SECRET), { expiresIn: '24h' })
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
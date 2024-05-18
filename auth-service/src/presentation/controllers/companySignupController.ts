import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { generateOtp } from "../../utils/otp/generateOtp";
import { sendOtp } from "../../utils/otp/sentOtp";
import { hashPassword } from "../../utils/hash/hashpassword";
import ErrorResponse from "../../utils/error/errorResponse";
import { addRequestValidation } from "../../utils/validation/addRequestValidation";
import RabbitMQClient from "../../infrastructure/rabbitmq/client";

export const companySignupController = (dependencies: IDependencies) => {
    const { useCases: { companySignupUseCase, companyEmailExistUseCase, verifyOtpUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body,"reached company signup controller")
           
            const { value, error } = addRequestValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {
                const data = value
                const companyExist = await companyEmailExistUseCase(dependencies).execute(data?.email)
                console.log(companyExist, "response from company exist")
                if (companyExist) {
                    return next(ErrorResponse.conflict("company already exists"))
                }

                if (!data?.otp) {
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
                                console.log(response)
                                return res.status(200).send({
                                    success: true,
                                    user: data,
                                    message: 'An Otp has been sent to the email'
                                })
                            })
                        }
                    }
                } else {
                    console.log('reached ')
                    const otpVerfication = await verifyOtpUseCase(dependencies).execute(data.email, data?.otp)
                    console.log(otpVerfication, "otp verification")
                    if (!otpVerfication) {
                        return next(ErrorResponse.unauthorized("incorrect otp"))
                    }

                    const password = await hashPassword(data.password)
                    if (!password) {
                        return next(ErrorResponse.forbidden('password required'))
                    } else {
                        data.password = password
                    }
                    console.log(data, "data in the comp signup")
                    const user = await companySignupUseCase(dependencies).execute(data)
                    if (!user) {
                        return next(ErrorResponse.notFound('failed to add company'))
                    }


                    return res.status(200).send({
                        success: true,
                        user: user,
                        message: "reqeust sent for validation successfully"

                    })
                }

            }

        }

        catch (error) {
            next(error)

        }
    }
}
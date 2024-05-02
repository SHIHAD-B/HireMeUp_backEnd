import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { passwordValidation } from "../../utils/validation/passwordValidation";

export const resetPasswordController = (dependencies: IDependencies) => {
    const { useCases: { resetPasswordUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body
            console.log("from reset password", req.body)
            if (!email) {
                next(ErrorResponse.badRequest("credential is missing"))
            }
            let errors:any = false
            if (password) {
                const { value, error } = passwordValidation.validate({password:password})
                errors=error
                
            }
            if (errors) {
                next(ErrorResponse.badRequest(errors.message))
            } else {

             

                    const hashedPassword = hashPassword(password)
                    if (!hashedPassword) {
                        next(ErrorResponse.forbidden("issue in hashing the password"))
                    }

                    const resetPassword = await resetPasswordUseCase(dependencies).execute(email, password)
                    if (!resetPassword) {
                        return next(ErrorResponse.forbidden("Error occured in resetting the data of user"))
                    } else {
                        return res.status(200).send({
                            success: true,
                            message: "user password resetted"

                        })
                    
                }
            }


        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
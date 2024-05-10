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

             

                    const hashedPassword:any = await hashPassword(password)
                    if (!hashedPassword) {
                        next(ErrorResponse.forbidden("issue in hashing the password"))
                    }else{
                        
                    }
                    const resetPassword = await resetPasswordUseCase(dependencies).execute(email, hashedPassword)

                    if (!resetPassword) {
                        return next(ErrorResponse.forbidden("Error occured in resetting the data of company"))
                    } else {
                        return res.status(200).send({
                            success: true,
                            message: "company password resetted"

                        })
                    
                }
            }


        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
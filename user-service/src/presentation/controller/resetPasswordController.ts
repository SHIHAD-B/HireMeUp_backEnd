import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { passwordValidation } from "../../utils/validation/passwordValidation";

/**
 * resetPasswordController - Controller function to reset user password.
 * 
 * This controller:
 * 1. Retrieves email and password from the request body.
 *    - Returns a bad request error if email is missing.
 * 2. Validates the password using `passwordValidation` utility.
 *    - Returns a bad request error if validation fails.
 * 3. Hashes the password using `hashPassword` utility.
 *    - Returns a forbidden error if hashing fails.
 * 4. Calls the `resetPasswordUseCase` to execute resetting the user password.
 *    - Returns a forbidden error if resetting fails.
 *    - Returns a success response if password is reset successfully.
 * 5. Handles and logs any caught errors during the execution.
 */


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
                    }

                    const resetPassword = await resetPasswordUseCase(dependencies).execute(email, hashedPassword)
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
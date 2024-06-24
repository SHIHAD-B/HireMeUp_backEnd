import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { passwordValidation } from "../../utils/validation/passwordValidation";

/**
 * resetPasswordController - Controller function to reset a company's password using the resetPasswordUseCase.
 * 
 * This controller:
 * 1. Retrieves email and password from the request body.
 * 2. Validates that the email is provided; otherwise, returns a bad request error.
 * 3. Validates the password format using passwordValidation.
 *    - If validation fails, returns a bad request error with the validation message.
 * 4. Hashes the provided password using hashPassword utility function.
 *    - If hashing fails, returns a forbidden error.
 * 5. Executes the resetPasswordUseCase to update the company's password with the new hashed password.
 *    - If the reset operation fails, returns a forbidden error indicating the failure.
 * 6. Returns a success response with a message indicating the company's password was reset successfully.
 * 7. Logs any errors encountered during the process and passes them to the error handler middleware.
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
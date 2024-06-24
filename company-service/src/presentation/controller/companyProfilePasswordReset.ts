import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { compare } from "bcrypt";
import { setProfilePasswordValidation } from "../../utils/validation/profilePassworValidation";

/**
 * resetProfilePasswordController - Handles the resetting of a company's password using the resetPasswordUseCase.
 * 
 * This controller:
 * 1. Retrieves the current password, new password, and email from the request body.
 * 2. Validates that the company email is provided; otherwise, returns a bad request error.
 * 3. Fetches the company using fetchCompanyUseCase based on the provided email.
 * 4. Returns a not found error if the company is not found or unable to be fetched.
 * 5. Validates that both current and new passwords are provided; otherwise, returns a bad request error.
 * 6. Compares the provided current password with the fetched company's hashed password.
 *    - If they don't match, returns a bad request error indicating incorrect current password.
 * 7. Validates the new password format using setProfilePasswordValidation.
 *    - If validation fails, returns a bad request error with the validation message.
 * 8. Hashes the new password using hashPassword utility function.
 *    - If hashing fails, returns an internal server error.
 * 9. Executes the resetPasswordUseCase to update the company's password with the new hashed password.
 *    - If the reset fails, returns an internal server error indicating the failure.
 * 10. Returns a success response with a message indicating the company's password was reset successfully.
 * 11. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const resetProfilePasswordController = (dependencies: IDependencies) => {
    const { useCases: { fetchCompanyUseCase, resetPasswordUseCase } } = dependencies;
    

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
        
            const { password, newPassword,email } = req.body;
           
            if (!email) {
                return next(ErrorResponse.badRequest("company email is missing."));
            }

            const user = await fetchCompanyUseCase(dependencies).execute(email);

            if (!user) {
                return next(ErrorResponse.notFound("company not found or unable to fetch company."));
            }

           

            if (!password || !newPassword) {
                return next(ErrorResponse.badRequest("Current or new password is missing."));
            }

            
            const passwordMatch = compare(password, user?.password);

            if (!passwordMatch) {
                return next(ErrorResponse.badRequest("Incorrect current password."));
            }

            const { error } = setProfilePasswordValidation.validate({ password: password,newPassword:newPassword });

            if (error) {
                return next(ErrorResponse.badRequest(error.message));
            }

            const hashedPassword = await hashPassword(newPassword);

            if (!hashedPassword) {
                return next(ErrorResponse.internalError("Error in hashing the password."));
            }

            const resetPassword= await resetPasswordUseCase(dependencies).execute(email, String(hashedPassword));

            if (!resetPassword) {
                return next(ErrorResponse.internalError("Error occurred in resetting the company's password."));
            }

            return res.status(200).send({
                success: true,
                message: "company password reset successfully."
            });

        } catch (error) {
            console.error("Error resetting company password:", error);
            return next(ErrorResponse.internalError("Failed to reset company password."));
        }
    };
};

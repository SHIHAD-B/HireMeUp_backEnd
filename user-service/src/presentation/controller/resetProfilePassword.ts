import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { compare } from "bcryptjs";
import { profilePasswordValidation } from "../../utils/validation/profilePassworValidation";


/**
 * resetProfilePasswordController - Controller function to reset user's profile password.
 * 
 * This controller:
 * 1. Retrieves email, current password, and new password from the request body.
 *    - Returns a bad request error if email is missing.
 * 2. Fetches the user using `fetchUserUseCase` based on the provided email.
 *    - Returns a not found error if user is not found.
 * 3. Compares the provided current password with the hashed password stored in the database.
 *    - Returns a bad request error if current password is incorrect.
 * 4. Validates the new password using `profilePasswordValidation` utility.
 *    - Returns a bad request error if validation fails.
 * 5. Hashes the new password using `hashPassword` utility.
 *    - Returns an internal server error if hashing fails.
 * 6. Calls the `resetPasswordUseCase` to execute resetting the user's password.
 *    - Returns an internal server error if resetting fails.
 *    - Returns a success response if password is reset successfully.
 * 7. Handles and logs any caught errors during the execution.
 */


export const resetProfilePasswordController = (dependencies: IDependencies) => {
    const { useCases: { fetchUserUseCase, resetPasswordUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
        
        
            const { password, newPassword,email } = req.body;
           

            if (!email) {
                return next(ErrorResponse.badRequest("User email is missing."));
            }

            const user = await fetchUserUseCase(dependencies).execute(email);

            if (!user) {
                return next(ErrorResponse.notFound("User not found or unable to fetch user."));
            }

           

            if (!password || !newPassword) {
                return next(ErrorResponse.badRequest("Current or new password is missing."));
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                return next(ErrorResponse.badRequest("Incorrect current password."));
            }

            const { error } = profilePasswordValidation.validate({ password: password,newPassword:newPassword });

            if (error) {
                return next(ErrorResponse.badRequest(error.message));
            }

            const hashedPassword = await hashPassword(newPassword);

            if (!hashedPassword) {
                return next(ErrorResponse.internalError("Error in hashing the password."));
            }

            const resetPassword= await resetPasswordUseCase(dependencies).execute(email, String(hashedPassword));

            if (!resetPassword) {
                return next(ErrorResponse.internalError("Error occurred in resetting the user's password."));
            }

            return res.status(200).send({
                success: true,
                message: "User password reset successfully."
            });

        } catch (error) {
            console.error("Error resetting user password:", error);
            return next(ErrorResponse.internalError("Failed to reset user password."));
        }
    };
};

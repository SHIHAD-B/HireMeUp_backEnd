import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { compare } from "bcrypt";
import { setProfilePasswordValidation } from "../../utils/validation/profilePassworValidation";

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

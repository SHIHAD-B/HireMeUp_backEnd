import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * blockCompanyController - Handles the blocking of a company using the blockCompanyUseCase.
 * 
 * This controller:
 * 1. Retrieves the company email from the request body.
 * 2. Validates that the company email is provided; otherwise, returns a bad request error.
 * 3. Executes the blockCompanyUseCase to block the company based on the provided email.
 * 4. Returns a not found error if the company is not found or unable to be blocked.
 * 5. Returns a success response with the blocked company details upon successful blocking.
 * 6. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const blockCompanyController = (dependencies: IDependencies) => {
    const { useCases: { blockCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("company email is missing."));
            }
            const blockeddUser = await blockCompanyUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("company not found or unable to block company."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "company blocked successfully."
                });
            }

        } catch (error: any) {
            console.error("Error blocking compnay:", error);
            return next(ErrorResponse.internalError("Failed to block company."));
        }
    }
}
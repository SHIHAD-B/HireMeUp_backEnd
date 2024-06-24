import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * unblockCompanyController - Controller function to unblock a company using the unblockCompanyUseCase.
 * 
 * This controller:
 * 1. Retrieves the company email from the request body.
 * 2. Validates that the company email is provided; otherwise, returns a bad request error.
 * 3. Executes the unblockCompanyUseCase to unblock the company using the provided email.
 *    - If the operation fails or the company is not found, returns a not found error.
 * 4. Returns a success response with the unblocked company data and a success message.
 * 5. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const unblockCompanyController = (dependencies: IDependencies) => {
    const { useCases: { unblockCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("company email is missing."));
            }
            const blockeddUser = await unblockCompanyUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("company not found or unable to unblock company."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "company unblocked successfully."
                });
            }

        } catch (error: any) {
            console.error("Error unblocking compnay:", error);
            return next(ErrorResponse.internalError("Failed to unblock company."));
        }
    }
}
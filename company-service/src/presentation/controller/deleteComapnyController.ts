import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * deleteCompanyController - Controller function to delete a company.
 * 
 * Steps:
 * 1. Retrieves the company email from the request body.
 * 2. Validates that the company email is provided; otherwise, returns a bad request error.
 * 3. Executes the deleteCompanyUseCase to delete the company based on the provided email.
 * 4. Returns a not found error if the company is not found or unable to be deleted.
 * 5. Returns a success response with the deleted company's information upon successful deletion.
 * 6. Logs any errors encountered during the process and passes them to the error handler middleware.
 */

export const deleteCompanyController = (dependencies: IDependencies) => {
    const { useCases: { deleteCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("company email is missing."));
            }
            const blockeddUser = await deleteCompanyUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("company not found or unable to delete company."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "company deleted successfully."
                });
            }

        } catch (error: any) {
            console.error("Error deleting compnay:", error);
            return next(ErrorResponse.internalError("Failed to delete company."));
        }
    }
}
import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * recoverCompanyController - Controller function to recover a company using the recoverCompanyUseCase.
 * 
 * Steps:
 * 1. Retrieves the company email from the request body.
 * 2. Validates that the company email is provided; otherwise, returns a bad request error.
 * 3. Executes the recoverCompanyUseCase to attempt to recover the company based on the provided email.
 * 4. Returns a not found error if the company is not found or unable to be recovered.
 * 5. Returns a success response with the recovered company details upon successful recovery.
 * 6. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const recoverCompanyController = (dependencies: IDependencies) => {
    const { useCases: { recoverCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("company email is missing."));
            }
            const blockeddUser = await recoverCompanyUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("company not found or unable to recover company."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "company recovered successfully."
                });
            }

        } catch (error: any) {
            console.error("Error recovering compnay:", error);
            return next(ErrorResponse.internalError("Failed to recover company."));
        }
    }
}
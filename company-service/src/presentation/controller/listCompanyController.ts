import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * listCompanyController - Controller function to list all companies using the listCompanyUseCase.
 * 
 * Steps:
 * 1. Executes the listCompanyUseCase to retrieve the list of companies.
 * 2. Returns a not found error if the list of companies is empty or cannot be retrieved.
 * 3. Returns a success response with the list of companies upon successful retrieval.
 * 4. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const listCompanyController = (dependencies: IDependencies) => {
    const { useCases: { listCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            const listRequests = await listCompanyUseCase(dependencies).execute()
            if (!listRequests) {
                return next(ErrorResponse.notFound("failed to fetch the company list"));
            } else {
                return res.status(200).json({
                    success: true,
                    user: listRequests,
                    message: "company fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching company:", error);
            return next(ErrorResponse.internalError("Failed to fetch company."));
        }
    }
}
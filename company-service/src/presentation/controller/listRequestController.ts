import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * listRequestController - Controller function to list all requests using the listRequestUseCase.
 * 
 * Steps:
 * 1. Executes the listRequestUseCase to retrieve the list of requests.
 * 2. Returns a not found error if the list of requests is empty or cannot be retrieved.
 * 3. Returns a success response with the list of requests upon successful retrieval.
 * 4. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const listRequestController = (dependencies: IDependencies) => {
    const { useCases: { listRequestUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            const listRequests = await listRequestUseCase(dependencies).execute()
            if (!listRequests) {
                return next(ErrorResponse.notFound("failed to fetch the requests"));
            } else {
                return res.status(200).json({
                    success: true,
                    user: listRequests,
                    message: "requests fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching requests:", error);
            return next(ErrorResponse.internalError("Failed to fetch requests."));
        }
    }
}
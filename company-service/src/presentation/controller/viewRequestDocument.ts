import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * viewRequestDocumentController - Controller function to view a request document using the viewRequestDocumentUseCase.
 * 
 * This controller:
 * 1. Retrieves the request document ID from the request body.
 * 2. Validates that the ID is provided; otherwise, returns a bad request error.
 * 3. Executes the viewRequestDocumentUseCase to fetch and view the request document based on the provided ID.
 *    - If the document is not found, returns a not found error.
 * 4. Returns a success response with a message indicating that the request document was viewed successfully.
 * 5. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const viewRequestDocumentController = (dependencies: IDependencies) => {
    const { useCases: { viewRequestDocumentUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.body.id

            const approveRequests = await viewRequestDocumentUseCase(dependencies).execute(id)
            if (!approveRequests) {
                return next(ErrorResponse.notFound("failed to view the requests"));
            } else {
                return res.status(200).json({
                    success: true,
                    message: "request Document viewed successfully."
                });
            }

        } catch (error: any) {
            console.error("Error viewing  request document:", error);
            return next(ErrorResponse.internalError("Failed to view request document."));
        }
    }
}
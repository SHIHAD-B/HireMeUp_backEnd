import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { sendRejectionNotification } from "../../utils/otp/sentRej";

/**
 * rejectRequestController - Controller function to reject requests using the rejectRequestUseCase.
 * 
 * This controller:
 * 1. Retrieves request data from the request body.
 * 2. Executes the rejectRequestUseCase to handle the rejection based on the provided data.
 * 3. Returns a not found error if the rejection operation fails.
 * 4. Sends a rejection notification via sendRejectionNotification utility function.
 * 5. Returns a success response with details of the rejected requests upon successful rejection.
 * 6. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const rejectRequestController = (dependencies: IDependencies) => {
    const { useCases: { rejectRequestUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body

            const approveRequests = await rejectRequestUseCase(dependencies).execute(data)
            if (!approveRequests) {
                return next(ErrorResponse.notFound("failed to reject the requests"));
            } else {
                sendRejectionNotification(data.email)
                return res.status(200).json({
                    success: true,
                    user: approveRequests,
                    message: "requests rejected successfully."
                });
            }

        } catch (error: any) {
            console.error("Error rejecting requests:", error);
            return next(ErrorResponse.internalError("Failed to reject requests."));
        }
    }
}
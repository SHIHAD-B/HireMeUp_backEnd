import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { sendApprovalNotification } from "../../utils/otp/sentAck";

/**
 * approveRequestController - Handles the approval of requests using the approveRequestUseCase.
 * 
 * This controller:
 * 1. Executes the approveRequestUseCase to approve requests based on the provided data.
 * 2. Returns a not found error if no requests are found or if approving the requests fails.
 * 3. Sends an approval notification via sendApprovalNotification.
 * 4. Returns a success response with the approved requests details upon successful approval.
 * 5. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const approveRequestController = (dependencies: IDependencies) => {
    const { useCases: { approveRequestUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body

            const approveRequests = await approveRequestUseCase(dependencies).execute(data)
            if (!approveRequests) {
                return next(ErrorResponse.notFound("failed to approve the requests"));
            } else {
                sendApprovalNotification(data.email)
                return res.status(200).json({
                    success: true,
                    user: approveRequests,
                    message: "requests approved successfully."
                });
            }

        } catch (error: any) {
            console.error("Error approving requests:", error);
            return next(ErrorResponse.internalError("Failed to approve requests."));
        }
    }
}
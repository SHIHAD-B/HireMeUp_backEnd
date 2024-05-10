import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { sendApprovalNotification } from "../../utils/otp/sentAck";

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
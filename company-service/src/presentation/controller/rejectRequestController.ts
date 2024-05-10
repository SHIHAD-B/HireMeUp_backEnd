import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { sendRejectionNotification } from "../../utils/otp/sentRej";

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
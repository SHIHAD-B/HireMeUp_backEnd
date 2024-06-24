import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const blockUnblockAdminController = (dependencies: IDependencies) => {
    const { useCases: { blockUnblockAdminUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("admin ID is missing."));
            }
            const blockeddUser = await blockUnblockAdminUserUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("admin not found or unable to block/unblock admin."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "admin blocked/unblocked successfully."
                });
            }

        } catch (error: any) {
            console.error("Error blocking user:", error);
            return next(ErrorResponse.internalError("Failed to block user."));
        }
    }
}
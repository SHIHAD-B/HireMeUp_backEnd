import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const unblockUserController = (dependencies: IDependencies) => {
    const { useCases: { unblockUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("User email is missing."));
            }
            const blockeddUser = await unblockUserUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("User not found or unable to unblock user."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "User unblocked successfully."
                });
            }

        } catch (error: any) {
            console.error("Error unblocking user:", error);
            return next(ErrorResponse.internalError("Failed to unblock user."));
        }
    }
}
import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const blockUserController = (dependencies: IDependencies) => {
    const { useCases: { blockUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("User ID is missing."));
            }
            const blockeddUser = await blockUserUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("User not found or unable to block user."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "User blocked successfully."
                });
            }

        } catch (error: any) {
            console.error("Error blocking user:", error);
            return next(ErrorResponse.internalError("Failed to block user."));
        }
    }
}
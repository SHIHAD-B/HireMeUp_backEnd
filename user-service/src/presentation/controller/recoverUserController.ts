import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const recoverUserController = (dependencies: IDependencies) => {
    const { useCases: { recoverUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("User email is missing."));
            }
            const recoveredUser = await recoverUserUseCase(dependencies).execute(userEmail)
            if (!recoveredUser) {
                return next(ErrorResponse.notFound("User not found or unable to recover user."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: recoveredUser,
                    message: "User recovered successfully."
                });
            }

        } catch (error: any) {
            console.error("Error deleting user:", error);
            return next(ErrorResponse.internalError("Failed to delete user."));
        }
    }
}
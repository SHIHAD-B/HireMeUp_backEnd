import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const deleteUserController = (dependencies: IDependencies) => {
    const { useCases: { deleteUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id
            if (!userId) {
                return next(ErrorResponse.badRequest("User ID is missing."));
            }
            const deletedUser = await deleteUserUseCase(dependencies).execute(userId)
            if (!deletedUser) {
                return next(ErrorResponse.notFound("User not found or unable to delete user."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: deletedUser,
                    message: "User deleted successfully."
                });
            }

        } catch (error: any) {
            console.error("Error deleting user:", error);
            return next(ErrorResponse.internalError("Failed to delete user."));
        }
    }
}
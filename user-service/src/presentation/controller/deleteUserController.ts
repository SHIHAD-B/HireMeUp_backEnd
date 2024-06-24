import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * deleteUserController - Controller function to handle deleting a user by email.
 * 
 * This controller:
 * 1. Validates the incoming request body for `email` (user email).
 *    - If `email` is missing, returns a bad request error.
 * 2. Calls the `deleteUserUseCase` to perform the deletion operation.
 *    - If the operation fails (user not found or unable to delete user), returns a not found error.
 * 3. Returns a success response with the deleted user object upon successful deletion.
 */


export const deleteUserController = (dependencies: IDependencies) => {
    const { useCases: { deleteUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("User email is missing."));
            }
            const deletedUser = await deleteUserUseCase(dependencies).execute(userEmail)
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
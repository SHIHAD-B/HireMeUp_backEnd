import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * unblockUserController - Controller function to unblock a user.
 * 
 * This controller:
 * 1. Retrieves the user's email from the request body.
 *    - Returns a bad request error if email is missing.
 * 2. Calls the `unblockUserUseCase` to execute unblocking the user based on the provided email.
 *    - Returns a not found error if user is not found or unable to unblock.
 * 3. Returns a success response with the unblocked user's details upon successful unblocking.
 * 4. Handles and logs any caught errors during the execution..
 */


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
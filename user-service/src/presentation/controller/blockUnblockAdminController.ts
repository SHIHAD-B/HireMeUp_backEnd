import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * blockUnblockAdminController - Controller function to handle blocking/unblocking an admin user.
 * 
 * This controller:
 * 1. Validates the incoming request body for the `email` of the admin user.
 *    - If validation fails (missing `email`), returns a bad request error.
 * 2. Calls the `blockUnblockAdminUserUseCase` to perform the blocking/unblocking operation.
 *    - If the operation fails (admin not found or unable to perform action), returns a not found or internal error.
 * 3. Returns a success response with the blocked/unblocked admin user object upon successful operation.
 */


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
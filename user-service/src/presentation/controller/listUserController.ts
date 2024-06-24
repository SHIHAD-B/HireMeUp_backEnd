import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * listUserController - Controller function to list all users.
 * 
 * This controller:
 * 1. Calls the `listUserUseCase` to execute fetching the list of users.
 *    - Returns a not found error if no users are found or unable to list.
 *    - Returns a success response with the list of users if available.
 * 2. Handles and logs any caught errors during the execution.
 */


export const listUserController = (dependencies: IDependencies) => {
    const { useCases: { listUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const users = await listUserUseCase(dependencies).execute()
            if (!users) {
                return next(ErrorResponse.notFound(" unable to list the user."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: users,
                    message: "Users listed successfully."
                });
            }

        } catch (error: any) {
            console.error("Error listing user:", error);
            return next(ErrorResponse.internalError("Failed to list user."));
        }
    }
}
import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { JwtPayload } from "jsonwebtoken";

/**
 * fetchUserController - Controller function to fetch details of a user.
 * 
 * This controller:
 * 1. Retrieves the `email` from the `req.user` object (decoded JWT payload).
 *    - Returns a bad request error if `email` is missing from `req.user`.
 * 2. Calls the `fetchUserUseCase` to execute fetching the user details using the `email`.
 *    - Returns a not found error if user is not found or unable to fetch.
 *    - Returns a success response with the fetched user details if not blocked or deleted.
 *    - Returns a response indicating user is blocked or deleted if `user.blocked` or `user.deleted` is true.
 * 3. Handles and logs any caught errors during the execution.
 */


export const fetchUserController = (dependencies: IDependencies) => {
    const { useCases: { fetchUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = (req.user as JwtPayload) || {};

            if (!email) {
                return next(ErrorResponse.badRequest("User email is missing.....(controller)"));
            }
            const user = await fetchUserUseCase(dependencies).execute(email)
            if (!user) {
                return next(ErrorResponse.notFound("User not found or unable to fetch user."));
            } else if (user.blocked == true || user.deleted == true) {
                return res.status(200).json({
                    success: false,
                    user: null,
                    message: "user is blocked or deleted"
                });
            } else {
                return res.status(200).json({
                    success: true,
                    user: user,
                    message: "User fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching user:", error);
            return next(ErrorResponse.internalError("Failed to fetch user."));
        }
    }
}
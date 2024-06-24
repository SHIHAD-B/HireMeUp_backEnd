import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig/config";


/**
 * fetchAdminController - Controller function to fetch details of an admin user.
 * 
 * This controller:
 * 1. Retrieves the `admin_token` from cookies in the incoming request (`req`).
 *    - Returns a bad request error if `admin_token` is missing.
 * 2. Verifies the `admin_token` using JWT and extracts the `email` of the admin.
 *    - Returns a bad request error if JWT verification fails or if `email` is missing.
 * 3. Calls the `fetchAdminUseCase` to execute fetching the admin details using the `email`.
 *    - Returns a not found error if admin is not found or unable to fetch.
 *    - Returns a success response with the fetched admin details if not blocked.
 *    - Returns a response indicating admin is blocked or deleted if `user.blocked` is true.
 * 4. Handles and logs any caught errors during the execution.
 */


export const fetchAdminController = (dependencies: IDependencies) => {
    const { useCases: { fetchAdminUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { admin_token } = req.cookies;
            if (!admin_token) {
                return next(ErrorResponse.badRequest("admin token is missing."));
            }
            const deToken: any = jwt.verify(admin_token, JWT_SECRET, (error: any, decode: any) => {
                if (error) {
                    return null
                }
                return decode
            });
            const { email } = deToken

            if (!email) {
                return next(ErrorResponse.badRequest("admin email is missing."));
            }
            const user: any = await fetchAdminUseCase(dependencies).execute(email)
            if (!user) {
                return next(ErrorResponse.notFound("admin not found or unable to fetch user."));
            } else if (user?.blocked == true) {
                return res.status(200).json({
                    success: false,
                    user: null,
                    message: "admin is blocked or deleted"
                });
            } else {
                return res.status(200).json({
                    success: true,
                    user: user,
                    message: "admin fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching admin:", error);
            return next(ErrorResponse.internalError("Failed to fetch admin."));
        }
    }
}
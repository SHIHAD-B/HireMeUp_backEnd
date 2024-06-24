import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * listAdminController - Controller function to list all admins.
 * 
 * This controller:
 * 1. Calls the `listAdminUseCase` to execute fetching the list of admins.
 *    - Returns a not found error if no admins are found or unable to list.
 *    - Returns a success response with the list of admins if available.
 * 2. Handles and logs any caught errors during the execution.
 */


export const listAdminController = (dependencies: IDependencies) => {
    const { useCases: { listAdminUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const admin = await listAdminUseCase(dependencies).execute()
            if (!admin) {
                return next(ErrorResponse.notFound(" unable to list the admin."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: admin,
                    message: "Admin listed successfully."
                });
            }

        } catch (error: any) {
            console.error("Error listing admin:", error);
            return next(ErrorResponse.internalError("Failed to list admin."));
        }
    }
}
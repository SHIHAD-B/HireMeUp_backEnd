import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


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
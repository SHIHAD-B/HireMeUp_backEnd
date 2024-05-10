import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const unblockCompanyController = (dependencies: IDependencies) => {
    const { useCases: { unblockCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("company email is missing."));
            }
            const blockeddUser = await unblockCompanyUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("company not found or unable to unblock company."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "company unblocked successfully."
                });
            }

        } catch (error: any) {
            console.error("Error unblocking compnay:", error);
            return next(ErrorResponse.internalError("Failed to unblock company."));
        }
    }
}
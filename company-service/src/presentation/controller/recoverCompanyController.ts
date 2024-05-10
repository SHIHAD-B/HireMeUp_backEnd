import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const recoverCompanyController = (dependencies: IDependencies) => {
    const { useCases: { recoverCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = req.body.email
            if (!userEmail) {
                return next(ErrorResponse.badRequest("company email is missing."));
            }
            const blockeddUser = await recoverCompanyUseCase(dependencies).execute(userEmail)
            if (!blockeddUser) {
                return next(ErrorResponse.notFound("company not found or unable to recover company."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "company recovered successfully."
                });
            }

        } catch (error: any) {
            console.error("Error recovering compnay:", error);
            return next(ErrorResponse.internalError("Failed to recover company."));
        }
    }
}
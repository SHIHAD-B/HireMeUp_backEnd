import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const listCompanyController = (dependencies: IDependencies) => {
    const { useCases: { listCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            const listRequests = await listCompanyUseCase(dependencies).execute()
            if (!listRequests) {
                return next(ErrorResponse.notFound("failed to fetch the company list"));
            } else {
                return res.status(200).json({
                    success: true,
                    user: listRequests,
                    message: "company fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching company:", error);
            return next(ErrorResponse.internalError("Failed to fetch company."));
        }
    }
}
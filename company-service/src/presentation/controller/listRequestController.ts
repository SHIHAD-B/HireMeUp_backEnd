import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const listRequestController = (dependencies: IDependencies) => {
    const { useCases: { listRequestUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            const listRequests = await listRequestUseCase(dependencies).execute()
            if (!listRequests) {
                return next(ErrorResponse.notFound("failed to fetch the requests"));
            } else {
                return res.status(200).json({
                    success: true,
                    user: listRequests,
                    message: "requests fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching requests:", error);
            return next(ErrorResponse.internalError("Failed to fetch requests."));
        }
    }
}
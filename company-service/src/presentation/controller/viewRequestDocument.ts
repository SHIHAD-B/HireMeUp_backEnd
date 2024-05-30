import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const viewRequestDocumentController = (dependencies: IDependencies) => {
    const { useCases: { viewRequestDocumentUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.body.id

            const approveRequests = await viewRequestDocumentUseCase(dependencies).execute(id)
            if (!approveRequests) {
                return next(ErrorResponse.notFound("failed to view the requests"));
            } else {
                return res.status(200).json({
                    success: true,
                    message: "request Document viewed successfully."
                });
            }

        } catch (error: any) {
            console.error("Error viewing  request document:", error);
            return next(ErrorResponse.internalError("Failed to view request document."));
        }
    }
}
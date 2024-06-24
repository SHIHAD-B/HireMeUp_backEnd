import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IJobs } from "../../domain/entities";



export const publishUnpublishController = (dependencies: IDependencies) => {
    const { useCases: { publishUnpublishJobUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {

        const id = req.body.id
        if (!id) {
            return next(ErrorResponse.badRequest("data is required"))
        } else {

            const job: IJobs | null = await publishUnpublishJobUseCase(dependencies).execute(id)
            if (!job) {
                return next(ErrorResponse.conflict("failed to edit job publish"))
            } else {
                return res.status(200).json({
                    success: true,
                    user: job,
                    message: "job published/unpublished successfully..."
                })
            }


        }

    }

}

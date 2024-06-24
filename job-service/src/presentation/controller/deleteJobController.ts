import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IJobs } from "../../domain/entities";



export const deleteJobController = (dependencies: IDependencies) => {
    const { useCases: { deleteJobUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id
            if (!id) {
                return next(ErrorResponse.badRequest("credential is missing"))
            } else {

                const job: IJobs | boolean | null = await deleteJobUseCase(dependencies).execute(id)
                if (!job) {
                    return next(ErrorResponse.forbidden("failed to delete job"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job delete successfully..."
                    })
                }
            }

        }

        catch (error) {
            next(error)

        }
    }
}
import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";



export const jobListController = (dependencies: IDependencies) => {
    const { useCases: { listJobsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

                const job: any = await listJobsUseCase(dependencies).execute()
                if (!job) {
                    return next(ErrorResponse.badRequest("failed to list job.."))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job listed successfully..."
                    })
                }
        }

        catch (error) {
            next(error)

        }
    }
}
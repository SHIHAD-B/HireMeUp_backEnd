import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";



export const fetchJobController = (dependencies: IDependencies) => {
    const { useCases: { fetchJobsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const id=req.params.id

                const job: any = await fetchJobsUseCase(dependencies).execute(id)
                if (!job) {
                    return next(ErrorResponse.badRequest("failed to fetch job.."))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job fetched successfully..."
                    })
                }
        }

        catch (error) {
            next(error)

        }
    }
}
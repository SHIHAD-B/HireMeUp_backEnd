import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";



export const fetchJobController = (dependencies: IDependencies) => {
    const { useCases: { fetchJobsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const id = req.params.id
            console.log(typeof id)
            function isValidObjectId(id: string) {
                const objectIdPattern = /^[0-9a-fA-F]{24}$/;
                return objectIdPattern.test(id);
            }
            if (!isValidObjectId(id)) {
                return next(ErrorResponse.badRequest("invalid company id..."))
            }

            const job: any = await fetchJobsUseCase(dependencies).execute(id)
            if (!job) {
                console.log("else not job")
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
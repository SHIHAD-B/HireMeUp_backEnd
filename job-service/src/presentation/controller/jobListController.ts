import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IJobs } from "../../domain/entities";

/**
 * jobListController - Controller function to handle listing jobs using listJobsUseCase.
 * 
 * This controller:
 * 1. Executes listJobsUseCase to retrieve a list of jobs.
 *    - If fetching fails or no jobs found, returns a bad request error.
 * 2. Returns a success response with the list of jobs if retrieval is successful.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */


export const jobListController = (dependencies: IDependencies) => {
    const { useCases: { listJobsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const job: IJobs[] | boolean | null = await listJobsUseCase(dependencies).execute()
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
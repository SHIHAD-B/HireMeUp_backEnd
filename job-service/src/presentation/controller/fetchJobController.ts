import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IJobs } from "../../domain/entities";

/**
 * fetchJobController - Controller function to handle fetching a job by ID using fetchJobsUseCase.
 * 
 * This controller:
 * 1. Validates the ID parameter to ensure it matches the expected format.
 *    - Uses isValidObjectId function to check if the ID is a valid ObjectId.
 *    - If ID is invalid, returns a bad request error.
 * 2. Executes fetchJobsUseCase to retrieve the job based on the validated ID.
 *    - If fetching fails, returns a bad request error.
 * 3. Returns a success response with the fetched job if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


export const fetchJobController = (dependencies: IDependencies) => {
    const { useCases: { fetchJobsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const id = req.params.id
            function isValidObjectId(id: string) {
                const objectIdPattern = /^[0-9a-fA-F]{24}$/;
                return objectIdPattern.test(id);
            }
            if (!isValidObjectId(id)) {
                return next(ErrorResponse.badRequest("invalid company id..."))
            }

            const job: IJobs[]| boolean | null= await fetchJobsUseCase(dependencies).execute(id)
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
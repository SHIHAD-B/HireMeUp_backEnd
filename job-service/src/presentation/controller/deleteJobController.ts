import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IJobs } from "../../domain/entities";

/**
 * deleteJobController - Controller function to handle deleting a job using deleteJobUseCase.
 * 
 * This controller:
 * 1. Extracts the job ID from the request body.
 *    - If ID is missing, returns a bad request error.
 * 2. Executes deleteJobUseCase to delete the job based on the ID.
 *    - If deletion fails or job is not found, returns a forbidden error.
 * 3. Returns a success response with the deleted job if deletion is successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


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
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { editJobValidation } from "../../utils/validation/editJobValidation";
import { IJobs } from "../../domain/entities";

/**
 * editJobController - Controller function to handle editing a job using editJobUseCase.
 * 
 * This controller:
 * 1. Modifies the request body by deleting unnecessary fields (deleted, __v, createdAt, expires).
 * 2. Validates the modified request body using editJobValidation.
 *    - If validation fails, returns a conflict error.
 * 3. Executes editJobUseCase to edit the job based on the validated data.
 *    - If editing fails, returns a conflict error.
 * 4. Returns a success response with the edited job if editing is successful.
 * 5. Passes any errors encountered during the process to the error handling middleware.
 */


export const editJobController = (dependencies: IDependencies) => {
    const { useCases: { editJobUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const eData = req.body
            delete eData.deleted
            delete eData.__v
            delete eData.createdAt
            delete eData.expires

            const { value, error } = editJobValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const job: IJobs | boolean | null = await editJobUseCase(dependencies).execute(value)
                if (!job) {
                    return next(ErrorResponse.conflict("failed to edit job"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job edited successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
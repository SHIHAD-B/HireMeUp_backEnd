import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import { addJobValidation } from "../../utils/validation/addJobValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { IJobs } from "../../domain/entities";

/**
 * addJobController - Controller function to handle adding jobs using the addJobUseCase.
 * 
 * This controller:
 * 1. Copies the request body data and removes the 'createdAt' field to prepare for validation.
 * 2. Validates the prepared data using addJobValidation.
 *    - If validation fails, returns a conflict error with the validation message.
 * 3. Executes the addJobUseCase to add the job based on the validated data.
 *    - If adding the job fails, returns a bad request error.
 * 4. Returns a success response with the added job data if successful.
 * 5. Passes any errors encountered during the process to the error handling middleware.
 */


export const addJobController = (dependencies: IDependencies) => {
    const { useCases: { addJobUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = {
                ...req.body
            }
            delete data.createdAt
            const { value, error } = addJobValidation.validate(data)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const job: IJobs | boolean | null = await addJobUseCase(dependencies).execute(value)
                if (!job) {
                    return next(ErrorResponse.badRequest("failed to add job.."))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job added successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
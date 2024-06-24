import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { scheduleValidation } from "../../utils/validation/scheduleValidation";
import { ISchedule } from "../../domain/entities/schedule.entity";

/**
 * editScheduleController - Controller function to handle editing a schedule using editScheduleUseCase.
 * 
 * This controller:
 * 1. Modifies the request body by deleting unnecessary fields (deleted, __v, createdAt, expires).
 * 2. Validates the modified request body using scheduleValidation.
 *    - If validation fails, returns a conflict error.
 * 3. Executes editScheduleUseCase to edit the schedule based on the validated data.
 *    - If editing fails, returns a conflict error.
 * 4. Returns a success response with the edited schedule if editing is successful.
 * 5. Passes any errors encountered during the process to the error handling middleware.
 */


export const editScheduleController = (dependencies: IDependencies) => {
    const { useCases: { editScheduleUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
         const eData=req.body
         delete eData.deleted
         delete eData.__v
         delete eData.createdAt
         delete eData.expires
         
            const { value, error } = scheduleValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const schedule: ISchedule | boolean | null  = await editScheduleUseCase(dependencies).execute(value)
                if (!schedule) {
                    return next(ErrorResponse.conflict("failed to edit schedule"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: schedule,
                        message: "schedule edited successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
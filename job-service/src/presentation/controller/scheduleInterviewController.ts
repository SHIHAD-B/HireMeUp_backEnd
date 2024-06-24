import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { scheduleValidation } from "../../utils/validation/scheduleValidation";
import { ISchedule } from "../../domain/entities/schedule.entity";

/**
 * scheduleInterviewController - Controller function to handle scheduling interviews using scheduleInterviewUseCase.
 * 
 * This controller:
 * 1. Checks if request body exists, if not, returns a bad request error.
 * 2. Validates the request body using scheduleValidation.
 *    - If validation fails, returns a conflict error with details.
 * 3. Executes scheduleInterviewUseCase to schedule the interview.
 *    - If scheduling fails due to candidate rejection, returns a bad request error.
 *    - If scheduling fails due to unavailability of slots, returns a bad request error.
 *    - If scheduling succeeds, returns a success response with the scheduled interview details.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


export const scheduleInterviewController = (dependencies: IDependencies) => {
    const { useCases: { scheduleInterviewUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.body){
                return next(ErrorResponse.badRequest("required data is missing..."))
            }

            const { value, error } = scheduleValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {
                   
                const schedule: ISchedule | boolean | null = await scheduleInterviewUseCase(dependencies).execute(value)
                if (schedule==false){
                    return next(ErrorResponse.badRequest("can't schedule and interview for rejected candidates.."))

                }else if (schedule==null) {
                    return next(ErrorResponse.badRequest("slot is not available ! kindly re-schdule to another time.."))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: schedule,
                        message: "schdule  added successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
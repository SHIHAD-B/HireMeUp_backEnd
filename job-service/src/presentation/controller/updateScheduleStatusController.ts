import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { ISchedule } from "../../domain/entities/schedule.entity";

/**
 * updateScheduleStatusController - Controller function to handle updating schedule status using updateScheduleStatusUseCase.
 * 
 * This controller:
 * 1. Checks if status and id are present in the request body, if not, returns a conflict error.
 * 2. Executes updateScheduleStatusUseCase to update the status of the schedule.
 *    - If updating fails, returns a conflict error with details.
 *    - If updating succeeds, returns a success response with the updated schedule details.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */


export const updateScheduleStatusController = (dependencies: IDependencies) => {
    const { useCases: { updateScheduleStatusUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const eData = req.body


            if (!eData.status || !eData.id) {
                return next(ErrorResponse.conflict("required data is missing..."))
            } else {

                const schedule: ISchedule | boolean | null = await updateScheduleStatusUseCase(dependencies).execute(eData.id, eData.status)
                if (!schedule) {
                    return next(ErrorResponse.conflict("failed to update status of schedule"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: schedule,
                        message: "schedule status updated successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
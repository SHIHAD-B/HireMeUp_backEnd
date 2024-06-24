import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { scheduleValidation } from "../../utils/validation/scheduleValidation";
import { IJobs } from "../../domain/entities";
import { ISchedule } from "../../domain/entities/schedule.entity";



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
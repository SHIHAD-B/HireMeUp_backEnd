import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { ISchedule } from "../../domain/entities/schedule.entity";


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
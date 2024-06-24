import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { scheduleValidation } from "../../utils/validation/scheduleValidation";
import { ISchedule } from "../../domain/entities/schedule.entity";



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
import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { ISchedule } from "../../domain/entities/schedule.entity";



export const fetchScheduleController = (dependencies: IDependencies) => {
    const { useCases: { fetchScheduleUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            function isValidObjectId(id: string) {
                const objectIdPattern = /^[0-9a-fA-F]{24}$/;
                return objectIdPattern.test(id);
            }
            if (!isValidObjectId(id)) {
                return next(ErrorResponse.badRequest("invalid  id..."))
            }

            const schedule: ISchedule[] | boolean | null = await fetchScheduleUseCase(dependencies).execute(id)
            if (!schedule) {
                return next(ErrorResponse.badRequest("failed to fetch schedule.."))
            } else {
                return res.status(200).json({
                    success: true,
                    user: schedule,
                    message: "schedule fetched successfully..."
                })
            }
        }

        catch (error) {
            next(error)

        }
    }
}
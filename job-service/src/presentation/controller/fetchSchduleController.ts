import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { ISchedule } from "../../domain/entities/schedule.entity";

/**
 * fetchScheduleController - Controller function to handle fetching a schedule by ID using fetchScheduleUseCase.
 * 
 * This controller:
 * 1. Validates the ID parameter to ensure it matches the expected format.
 *    - Uses isValidObjectId function to check if the ID is a valid ObjectId.
 *    - If ID is invalid, returns a bad request error.
 * 2. Executes fetchScheduleUseCase to retrieve the schedule based on the validated ID.
 *    - If fetching fails, returns a bad request error.
 * 3. Returns a success response with the fetched schedule if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


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
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/error/errorResponse";
import { IDependencies } from "../../domain/interfaces/dependencies";





export const fetchNotificationController = (dependencies: IDependencies) => {
    const { useCases: { fetchNotificationUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id

            if (!id ) {
                return next(ErrorResponse.badRequest("id is required"))
            }

           
            const fetchedNotification = await fetchNotificationUseCase(dependencies).execute(String(id))
            if (!fetchedNotification) {
                return next(ErrorResponse.forbidden("Error occured in fetching notification  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: fetchedNotification,
                    message: "notification  fetched"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
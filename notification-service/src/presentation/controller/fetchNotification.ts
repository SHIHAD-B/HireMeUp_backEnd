import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/error/errorResponse";
import { IDependencies } from "../../domain/interfaces/dependencies";


/**
 * fetchNotificationController - Controller function to handle fetching notifications for a user.
 * 
 * This controller:
 * 1. Retrieves the user id from request parameters.
 *    - If id is missing, returns a bad request error.
 * 2. Executes fetchNotificationUseCase to fetch notifications for the specified user id.
 *    - If fetching notifications fails, returns a forbidden error with details.
 *    - If fetching notifications succeeds, returns a success response with the fetched notifications.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */



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
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/error/errorResponse";
import { IDependencies } from "../../domain/interfaces/dependencies";
import { addNotificationValidation } from "../../utils/error/validation/addNotificationValidation";


/**
 * addNotificationController - Controller function to handle adding notifications using addNotificationUseCase.
 * 
 * This controller:
 * 1. Checks if request body contains required data; if not, returns a bad request error.
 * 2. Validates the structure of the notification data using addNotificationValidation.
 *    - If validation fails, returns a bad request error with details.
 * 3. Executes addNotificationUseCase to add the notification.
 *    - If adding notification fails, returns a forbidden error with details.
 *    - If adding notification succeeds, returns a success response with the added notification details.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


export const addNotificationController = (dependencies: IDependencies) => {
    const { useCases: { addNotificationUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas ) {
                return next(ErrorResponse.badRequest("data is required."))
            }

            const { value, error } = addNotificationValidation.validate(datas.data)
            if (error) {
                return next(ErrorResponse.badRequest(error.message))
            }


            const addeddNotification = await addNotificationUseCase(dependencies).execute(datas)
            if (!addeddNotification) {
                return next(ErrorResponse.forbidden("Error occured in adding notification  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: addeddNotification,
                    message: "notification  added"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
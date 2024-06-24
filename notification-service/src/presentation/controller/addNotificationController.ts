import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/error/errorResponse";
import { IDependencies } from "../../domain/interfaces/dependencies";
import { addNotificationValidation } from "../../utils/error/validation/addNotificationValidation";




export const addNotificationController = (dependencies: IDependencies) => {
    const { useCases: { addNotificationUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas ) {
                return next(ErrorResponse.badRequest("data is required"))
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
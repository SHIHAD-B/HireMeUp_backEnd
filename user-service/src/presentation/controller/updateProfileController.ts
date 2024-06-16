import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { updateProfileValidation } from "../../utils/validation/updateProfileValidation";



export const updateProfileController = (dependencies: IDependencies) => {
    const { useCases: { updateProfielUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = updateProfileValidation.validate(datas)
            if (error) {
                return next(ErrorResponse.badRequest(error.message))
            }

           const {id,data,field}=datas

            const editedUser = await updateProfielUseCase(dependencies).execute(id,data,field)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in editing the data of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user profile edited"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
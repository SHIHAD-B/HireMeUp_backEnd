import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { educationValidation } from "../../utils/validation/educationValidation";



export const editEducationController = (dependencies: IDependencies) => {
    const { useCases: { editEducationUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.data) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = educationValidation.validate(datas.data)
            if (error) {
                return next(ErrorResponse.badRequest(error.message))
            }

            const { id, data } = datas

            const editedUser = await editEducationUseCase(dependencies).execute(id, data)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in editng education  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user education edited"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
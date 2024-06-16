import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { experienceValidation } from "../../utils/validation/addExperinceValidation";



export const addExperienceController = (dependencies: IDependencies) => {
    const { useCases: { addExperienceUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.data) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = experienceValidation.validate(datas.data)
            if (error) {
                return next(ErrorResponse.badRequest(error.message))
            }

            const { id, data } = datas

            const editedUser = await addExperienceUseCase(dependencies).execute(id, data)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in adding experience  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user exprerience added"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";




export const deleteSkillController = (dependencies: IDependencies) => {
    const { useCases: { deleteSkillUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body
           

            if (!datas || !datas.id || !datas.skill) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { id,skill } = datas

            const editedUser = await deleteSkillUseCase(dependencies).execute(id,skill)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in deleting akill of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user skill deleted"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
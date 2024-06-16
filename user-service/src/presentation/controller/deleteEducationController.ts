import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";




export const deleteEducationController = (dependencies: IDependencies) => {
    const { useCases: { deleteEducationUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.userId) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { userId,id } = datas

            const editedUser = await deleteEducationUseCase(dependencies).execute(userId,id)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in deleting education  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user education deleted"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

export const addResumeController = (dependencies: IDependencies) => {
    const { useCases: { addResumeUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.resume || datas.id.trim()=="" || datas.resume.trim()=="") {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { id, resume } = datas

            const editedUser = await addResumeUseCase(dependencies).execute(id, resume)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in adding resume  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user rewume added"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
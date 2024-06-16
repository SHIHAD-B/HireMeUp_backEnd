import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

export const addLanguageController = (dependencies: IDependencies) => {
    const { useCases: { addLanguageUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.language) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { id, language } = datas

            const editedlang = await addLanguageUseCase(dependencies).execute(id, language)
            if (!editedlang) {
                return next(ErrorResponse.forbidden("Error occured in adding language  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedlang,
                    message: "user language added"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
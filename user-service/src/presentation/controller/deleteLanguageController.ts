import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";




export const deleteLanguageController = (dependencies: IDependencies) => {
    const { useCases: { deleteLanguageUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body
            console.log(req.body)

            if (!datas || !datas.id || !datas.language) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { id,language } = datas

            const editedLang = await deleteLanguageUseCase(dependencies).execute(id,language)
            if (!editedLang) {
                return next(ErrorResponse.forbidden("Error occured in deleting language of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedLang,
                    message: "user language deleted"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
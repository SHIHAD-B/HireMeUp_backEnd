import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * deleteLanguageController - Controller function to handle deleting language of a user.
 * 
 * This controller:
 * 1. Validates the incoming request body for `id` (user ID) and `language` (language to delete).
 *    - If validation fails (missing `id` or `language`), returns a bad request error.
 * 2. Calls the `deleteLanguageUseCase` to perform the deletion operation.
 *    - If the operation fails (language not found or unable to delete language), returns a forbidden error.
 * 3. Returns a success response with the updated user object upon successful deletion.
 */



export const deleteLanguageController = (dependencies: IDependencies) => {
    const { useCases: { deleteLanguageUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body
           

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
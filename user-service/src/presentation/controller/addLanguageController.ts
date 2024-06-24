import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * addLanguageController - Controller function to handle adding language details for a user.
 * 
 * This controller:
 * 1. Validates the incoming request body for required fields (`id` and `language`).
 *    - If validation fails, returns a bad request error.
 * 2. Calls the `addLanguageUseCase` to add language details for the user.
 *    - If adding language fails, returns a forbidden error.
 * 3. Returns a success response with the updated user object containing language details upon successful addition.
 */



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
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { socialLinkValidation } from "../../utils/validation/socialLinkValidation";

/**
 * editSocialLinkController - Controller function to handle editing a user's social links.
 * 
 * This controller:
 * 1. Extracts and validates the incoming request body (`datas`).
 *    - Checks if `datas` contains `id` and `data`.
 *    - Validates `datas.data` using `socialLinkValidation`.
 *    - Returns a bad request error if `datas` or its fields are missing, or validation fails.
 * 2. Calls the `editSocialLinkUseCase` to execute the edit operation using `id` and `data`.
 *    - If the operation fails, returns a forbidden error.
 * 3. Returns a success response with the edited user's social links upon successful edit.
 */


export const editSocialLinkController = (dependencies: IDependencies) => {
    const { useCases: { editSocialLinkUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.data) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = socialLinkValidation.validate(datas.data)
            if (error) {
                return next(ErrorResponse.badRequest(error.message))
            }

            const { id, data } = datas

            const editedsociallink = await editSocialLinkUseCase(dependencies).execute(id, data)
            if (!editedsociallink) {
                return next(ErrorResponse.forbidden("Error occured in editng social links   of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedsociallink,
                    message: "user social link edited"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
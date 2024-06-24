import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { educationValidation } from "../../utils/validation/educationValidation";

/**
 * editEducationController - Controller function to handle editing a user's education details.
 * 
 * This controller:
 * 1. Extracts and validates the incoming request body (`datas`).
 *    - Checks if `datas` contains `id` and `data`.
 *    - Validates `datas.data` using `educationValidation`.
 *    - Returns a bad request error if `datas` or its fields are missing, or validation fails.
 * 2. Calls the `editEducationUseCase` to execute the edit operation using `id` and `data`.
 *    - If the operation fails, returns a forbidden error.
 * 3. Returns a success response with the edited user's education details upon successful edit.
 */


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
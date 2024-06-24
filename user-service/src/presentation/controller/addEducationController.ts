import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { educationValidation} from "../../utils/validation/educationValidation";

/**
 * addEducationController - Controller function to handle adding education details for a user.
 * 
 * This controller:
 * 1. Validates the incoming request body for required fields (`id` and `data`).
 *    - If validation fails, returns a bad request error.
 * 2. Validates the education data using `educationValidation`.
 *    - If validation fails, returns a bad request error with the validation message.
 * 3. Calls the `addEducationUseCase` to add education details for the user.
 *    - If adding education fails, returns a forbidden error.
 * 4. Returns a success response with the updated user object containing education details upon successful addition.
 */


export const addEducationController = (dependencies: IDependencies) => {
    const { useCases: { addEducationUseCase } } = dependencies

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

            const editedUser = await addEducationUseCase(dependencies).execute(id, data)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in adding education  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user education added"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
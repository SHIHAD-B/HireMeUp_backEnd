import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { addressValidation } from "../../utils/validation/addressValidation";

/**
 * addAddressController - Controller function to handle adding an address to a user.
 * 
 * This controller:
 * 1. Validates the incoming request body for required fields (`id` and `data`).
 *    - If validation fails, returns a bad request error.
 * 2. Validates the address data using `addressValidation`.
 *    - If validation fails, returns a bad request error with the validation message.
 * 3. Calls the `addAddressUseCase` to add the address to the user identified by `id`.
 *    - If the address addition fails, returns a forbidden error.
 * 4. Returns a success response with the updated user object upon successful address addition.
 */


export const addAddressController = (dependencies: IDependencies) => {
    const { useCases: { addAddressUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.data) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = addressValidation.validate(datas.data)
            if (error) {
                return next(ErrorResponse.badRequest(error.message))
            }

            const { id, data } = datas

            const editedUser = await addAddressUseCase(dependencies).execute(id, data)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in adding address  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user address added"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { editAdminValidation } from "../../utils/validation/editAdminValidation";

/**
 * editAdminController - Controller function to handle editing an admin's details.
 * 
 * This controller:
 * 1. Extracts and validates the incoming request body (`data`) using `editAdminValidation`.
 *    - Deletes the `__v` field from the `data`.
 *    - If `data` is missing or validation fails, returns a bad request error.
 * 2. Hashes the `password` field of `value` if present using `hashPassword`.
 *    - If hashing fails, returns a forbidden error.
 * 3. Calls the `editAdminUseCase` to execute the edit operation.
 *    - If the operation fails, returns a forbidden error.
 * 4. Returns a success response with the edited admin's details upon successful edit.
 */


export const editAdminController = (dependencies: IDependencies) => {
    const { useCases: { editAdminUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body

                delete data.__v
            
   
            if (!data) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = editAdminValidation.validate(data)
            if (error) {
                return next(ErrorResponse.badRequest(error.message))
            }

            if (value.password) {
                const password = await hashPassword(value.password)
                if (!password) {
                    return next(ErrorResponse.forbidden("Error occured in hashing password"))
                } else {
                    value.password = password
                }
            }

            const editedUser = await editAdminUseCase(dependencies).execute(value)
            if (!editedUser) {

                return next(ErrorResponse.forbidden("Error occured in editing the data of admin"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: value,
                    message: "admin details edited"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
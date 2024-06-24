import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { editUserValidation } from "../../utils/validation/editUserValidation";
import { hashPassword } from "../../utils/hash/hashpassword";

/**
 * updateUserController - Controller function to update user details.
 * 
 * This controller:
 * 1. Deletes the `__v` field from the request body `data` if present.
 * 2. Validates the request body `data` to ensure required fields are present and valid using `editUserValidation`.
 *    - Returns a bad request error if validation fails.
 * 3. Hashes the password field in `data` if present using `hashPassword`.
 *    - Returns a forbidden error if hashing fails.
 * 4. Calls the `updateUserUseCase` to execute updating the user details based on the validated and hashed `value`.
 *    - Returns a forbidden error if updating the user details fails.
 * 5. Returns a success response with the updated user's details upon successful update.
 * 6. Handles and logs any caught errors during the execution.
 */

export const updateUserController = (dependencies: IDependencies) => {
    const { useCases: { updateUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            if(data.__v){
                delete data.__v
            }
    
            if (!data) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = editUserValidation.validate(data)
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

            const editedUser = await updateUserUseCase(dependencies).execute(value)
            if (!editedUser) {

                return next(ErrorResponse.forbidden("Error occured in editing the data of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: value,
                    message: "user details edited"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
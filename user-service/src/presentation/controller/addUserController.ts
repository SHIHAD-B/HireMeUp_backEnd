import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { addUserValidation } from "../../utils/validation/addUserValidation";

/**
 * addUserController - Controller function to handle adding a new user.
 * 
 * This controller:
 * 1. Validates the incoming request body for required fields (`email` and `password`).
 *    - If validation fails (missing data), returns a bad request error.
 * 2. Hashes the user's password using the `hashPassword` utility function.
 *    - If hashing fails, returns a forbidden error.
 * 3. Calls the `addUserUseCase` to add the user with validated and hashed data.
 *    - If adding user fails (e.g., email or phone already exists), returns a conflict or forbidden error.
 * 4. Returns a success response with the added user object upon successful addition.
 */


export const addUserController = (dependencies: IDependencies) => {
    const { useCases: { addUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            if (!data || !data.email || !data.password) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = addUserValidation.validate(data)
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

            const addUser = await addUserUseCase(dependencies).execute(value)
            if(addUser==false){
                return next(ErrorResponse.conflict("email or phone already exists"))

            }else if (!addUser) {
                return next(ErrorResponse.forbidden("Error occured in adding the data of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: addUser,
                    message: "user added successfully"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
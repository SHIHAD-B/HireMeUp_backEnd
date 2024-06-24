import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { addAdminValidation } from "../../utils/validation/addAdminValidation";

/**
 * addAdminController - Controller function to handle adding an admin user.
 * 
 * This controller:
 * 1. Validates the incoming request body for required fields (`email` and `password`).
 *    - If validation fails, returns a bad request error.
 * 2. Validates the admin data using `addAdminValidation`.
 *    - If validation fails, returns a bad request error with the validation message.
 * 3. Hashes the admin's password using `hashPassword` utility function.
 *    - If hashing fails, returns a forbidden error.
 * 4. Calls the `addAdminUseCase` to add the admin user with hashed password.
 *    - If the admin already exists, returns a conflict error.
 *    - If adding admin fails, returns a forbidden error.
 * 5. Returns a success response with the added admin user object upon successful addition.
 */


export const addAdminController = (dependencies: IDependencies) => {
    const { useCases: { addAdminUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            if (!data || !data.email || !data.password) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { value, error } = addAdminValidation.validate(data)
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

            const addAdmin = await addAdminUseCase(dependencies).execute(value)
            if(addAdmin==false){
                return next(ErrorResponse.conflict("admin already exists"))

            }else if (!addAdmin) {
                return next(ErrorResponse.forbidden("Error occured in adding the data of admin"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: addAdmin,
                    message: "admin added successfully"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
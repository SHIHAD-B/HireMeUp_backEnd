import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { addAdminValidation } from "../../utils/validation/addAdminValidation";



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
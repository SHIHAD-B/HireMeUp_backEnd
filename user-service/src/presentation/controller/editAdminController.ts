import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { hashPassword } from "../../utils/hash/hashpassword";
import { editAdminValidation } from "../../utils/validation/editAdminValidation";



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
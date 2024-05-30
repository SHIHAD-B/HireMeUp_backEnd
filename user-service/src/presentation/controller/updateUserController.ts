import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { editUserValidation } from "../../utils/validation/editUserValidation";
import { hashPassword } from "../../utils/hash/hashpassword";



export const editUserController = (dependencies: IDependencies) => {
    const { useCases: { updateUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            console.log(data,"data in the back end")
            if(data.__v){
                console.log("camed")
                delete data.__v
            }
            console.log(data,"data in the back end")
    
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
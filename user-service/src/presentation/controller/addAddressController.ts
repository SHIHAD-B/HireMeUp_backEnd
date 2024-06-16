import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { addressValidation } from "../../utils/validation/addressValidation";



export const addAddressController = (dependencies: IDependencies) => {
    const { useCases: { addAddressUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body
            console.log(datas,"dataasssss")

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
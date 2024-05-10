import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { editPlanValidation } from "../../utils/validation/editPlanValidation";



export const editPlanController = (dependencies: IDependencies) => {
    const { useCases: { editPlansUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            if (!data) {
                return next(ErrorResponse.badRequest("data is required"))
            }
             delete data.deleted
             delete data.editedAt
             delete data.createdAt
             delete data.__v
            const { value, error } = editPlanValidation.validate(req.body)
            if (error) {
                return next(ErrorResponse.badRequest(error.message))
            }

           

            const editedPlan = await editPlansUseCase(dependencies).execute(value)
            if (!editedPlan) {
                return next(ErrorResponse.forbidden("Error occured in editing the data of plan"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: value,
                    message: "plan details edited"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}
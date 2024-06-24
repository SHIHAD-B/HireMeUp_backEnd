import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { editPlanValidation } from "../../utils/validation/editPlanValidation";

/**
 * editPlanController - Controller function to handle editing details of a plan.
 * 
 * This controller:
 * 1. Validates the incoming request body using `editPlanValidation`.
 *    - If validation fails, returns a bad request error with the validation message.
 * 2. Deletes non-editable fields (`deleted`, `editedAt`, `createdAt`, `__v`) from the `data` object.
 * 3. Calls the `editPlansUseCase` to update the plan details with the validated `value`.
 *    - If a plan with the same details already exists, returns a conflict error.
 *    - If editing fails for any other reason, returns a forbidden error.
 * 4. Returns a success response with the edited plan details upon successful editing.
 */


export const editPlanController = (dependencies: IDependencies) => {
    const { useCases: { editPlansUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            console.log(req.body,"body in subscription")
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
            if(editedPlan==false){
                return next(ErrorResponse.conflict("plan already exist"))

            }else if(!editedPlan) {
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
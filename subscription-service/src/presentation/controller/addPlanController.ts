import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { addPlanValidation } from "../../utils/validation/planValidation";

export const addPlansController = (dependencies: IDependencies) => {
    const { useCases: { addPlansUseCase, PlanExistsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            console.log(data,"data in the back end of add plan")
            const { error, value } = addPlanValidation.validate(data)
            if (error) {
                return next(ErrorResponse.badRequest(String(error)));

            }
            const exist = await PlanExistsUseCase(dependencies).execute(value.name)
            if (exist) {
                return next(ErrorResponse.conflict("plan already exists"));

            }

            const users = await addPlansUseCase(dependencies).execute(value)
            if (!users) {
                return next(ErrorResponse.notFound(" unable to add the plans."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: users,
                    message: "plans added successfully."
                });
            }

        } catch (error: any) {
            console.error("Error adding plans:", error);
            return next(ErrorResponse.internalError("Failed to add plans."));
        }
    }
}
import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { addPlanValidation } from "../../utils/validation/planValidation";

/**
 * addPlansController - Controller function to handle adding plans.
 * 
 * This controller:
 * 1. Validates the incoming request data using addPlanValidation.
 *    - If validation fails, returns a bad request error with details.
 * 2. Checks if the plan already exists using PlanExistsUseCase.
 *    - If the plan already exists, returns a conflict error indicating the plan already exists.
 * 3. Executes addPlansUseCase to add the plan.
 *    - If adding the plan fails, returns a not found error indicating failure to add the plan.
 *    - If adding the plan succeeds, returns a success response with the added plan details.
 * 4. Handles any errors encountered during the process and passes them to the error handling middleware.
 */


export const addPlansController = (dependencies: IDependencies) => {
    const { useCases: { addPlansUseCase, PlanExistsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
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
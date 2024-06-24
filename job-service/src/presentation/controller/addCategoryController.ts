import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import { addCategoryValidation } from "../../utils/validation/addCategoryValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { ICategory } from "../../domain/entities";

/**
 * addCategoryController - Controller function to handle adding categories using the addCategoryUseCase.
 * 
 * This controller:
 * 1. Validates the incoming request body using addCategoryValidation.
 *    - If validation fails, returns a conflict error with the validation message.
 * 2. Executes the addCategoryUseCase to add the category based on the validated data.
 *    - If the category already exists, returns a conflict error.
 * 3. Returns a success response with the added category data if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


export const addCategoryController = (dependencies: IDependencies) => {
    const { useCases: { addCategoryUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { value, error } = addCategoryValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const category: ICategory | boolean | null = await addCategoryUseCase(dependencies).execute(value)
                if (!category) {
                    return next(ErrorResponse.conflict("already Exists"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: category,
                        message: "category added successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
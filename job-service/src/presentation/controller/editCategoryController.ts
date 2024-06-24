import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import { editCategoryValidation } from "../../utils/validation/editCategoryValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { ICategory } from "../../domain/entities";

/**
 * editCategoryController - Controller function to handle editing a category using editCategoryUseCase.
 * 
 * This controller:
 * 1. Validates the request body using editCategoryValidation.
 *    - If validation fails, returns a conflict error.
 * 2. Executes editCategoryUseCase to edit the category based on the validated data.
 *    - If the category already exists, returns a conflict error.
 *    - If editing fails for any reason, returns a conflict error.
 * 3. Returns a success response with the edited category if editing is successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


export const editCategoryController = (dependencies: IDependencies) => {
    const { useCases: { editCategoryUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = editCategoryValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const category: ICategory | boolean |null = await editCategoryUseCase(dependencies).execute(value)
                if (category == false) {
                    return next(ErrorResponse.conflict("Category already exists"))
                } else if (!category) {
                    return next(ErrorResponse.conflict("Failed to edit category"))

                } else {
                    return res.status(200).json({
                        success: true,
                        user: category,
                        message: "category edited successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
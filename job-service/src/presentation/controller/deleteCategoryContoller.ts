import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { ICategory } from "../../domain/entities";

/**
 * deleteCategoryController - Controller function to handle deleting a category using deleteCategoryUseCase.
 * 
 * This controller:
 * 1. Extracts the category ID from the request body.
 *    - If ID is missing, returns a bad request error.
 * 2. Executes deleteCategoryUseCase to delete the category based on the ID.
 *    - If deletion fails or category is not found, returns a forbidden error.
 * 3. Returns a success response with the deleted category if deletion is successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


export const deleteCategoryController = (dependencies: IDependencies) => {
    const { useCases: { deleteCategoryUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id
            if (!id) {
                return next(ErrorResponse.badRequest("credential is missing"))
            } else {

                const category: ICategory | boolean | null = await deleteCategoryUseCase(dependencies).execute(id)
                if (!category) {
                    return next(ErrorResponse.forbidden("failed to delete category"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: category,
                        message: "category delete successfully..."
                    })
                }
            }

        }

        catch (error) {
            next(error)

        }
    }
}
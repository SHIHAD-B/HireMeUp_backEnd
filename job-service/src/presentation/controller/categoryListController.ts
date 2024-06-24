import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { ICategory } from "../../domain/entities";

/**
 * categoryListController - Controller function to handle listing categories using the listCategoryUseCase.
 * 
 * This controller:
 * 1. Executes the listCategoryUseCase to retrieve a list of categories.
 *    - If listing categories fails, returns a bad request error.
 * 2. Returns a success response with the list of categories if successful.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */


export const categoryListController = (dependencies: IDependencies) => {
    const { useCases: { listCategoryUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const category: ICategory[] | boolean | null = await listCategoryUseCase(dependencies).execute()
            if (!category) {
                return next(ErrorResponse.badRequest("failed to list category.."))
            } else {
                return res.status(200).json({
                    success: true,
                    user: category,
                    message: "category listed successfully..."
                })
            }
        }

        catch (error) {
            next(error)

        }
    }
}
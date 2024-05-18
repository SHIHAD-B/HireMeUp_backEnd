import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import { editCategoryValidation } from "../../utils/validation/editCategoryValidation";
import ErrorResponse from "../../utils/error/errorResponse";



export const editCategoryController = (dependencies: IDependencies) => {
    const { useCases: { editCategoryUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { value, error } = editCategoryValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const category: any = await editCategoryUseCase(dependencies).execute(value)
                if (!category) {
                    return next(ErrorResponse.conflict("failed to edit category"))
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
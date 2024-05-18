import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import { addCategoryValidation } from "../../utils/validation/addCategoryValidation";
import ErrorResponse from "../../utils/error/errorResponse";



export const addCategoryController = (dependencies: IDependencies) => {
    const { useCases: { addCategoryUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { value, error } = addCategoryValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const category: any = await addCategoryUseCase(dependencies).execute(value)
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
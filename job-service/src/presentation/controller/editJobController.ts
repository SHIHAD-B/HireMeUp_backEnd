import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import { addCategoryValidation } from "../../utils/validation/addCategoryValidation";
import ErrorResponse from "../../utils/error/errorResponse";



export const editJobController = (dependencies: IDependencies) => {
    const { useCases: { editJobUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { value, error } = addCategoryValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const job: any = await editJobUseCase(dependencies).execute(value)
                if (!job) {
                    return next(ErrorResponse.conflict("failed to edit job"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job edited successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
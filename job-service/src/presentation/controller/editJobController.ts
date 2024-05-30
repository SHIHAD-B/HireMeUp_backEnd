import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { editJobValidation } from "../../utils/validation/editJobValidation";



export const editJobController = (dependencies: IDependencies) => {
    const { useCases: { editJobUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
         const eData=req.body
         delete eData.deleted
         delete eData.__v
         delete eData.createdAt
         delete eData.expires
         
            const { value, error } = editJobValidation.validate(req.body)

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
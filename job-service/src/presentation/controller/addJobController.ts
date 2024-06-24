import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import { addJobValidation } from "../../utils/validation/addJobValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { IJobs } from "../../domain/entities";



export const addJobController = (dependencies: IDependencies) => {
    const { useCases: { addJobUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = {
                ...req.body
            }
            delete data.createdAt
            const { value, error } = addJobValidation.validate(data)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const job: IJobs | boolean | null = await addJobUseCase(dependencies).execute(value)
                if (!job) {
                    return next(ErrorResponse.badRequest("failed to add job.."))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job added successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
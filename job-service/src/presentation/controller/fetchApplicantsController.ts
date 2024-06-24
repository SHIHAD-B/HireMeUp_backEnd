import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";



export const fetchApplicantsController = (dependencies: IDependencies) => {
    const { useCases: { fetchApplicantsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
         
            const id = req.params.id
            if (!id || id==undefined) {

                return next(ErrorResponse.badRequest("id is required..."))
            }

            const applicants: IApplicants[] | boolean | null = await fetchApplicantsUseCase(dependencies).execute(id)
            if (!applicants) {
                return next(ErrorResponse.badRequest("failed to fetch applicants.."))
            } else {
                return res.status(200).json({
                    success: true,
                    user: applicants,
                    message: "applicants fetched successfully..."
                })
            }
        }

        catch (error) {
            next(error)

        }
    }
}
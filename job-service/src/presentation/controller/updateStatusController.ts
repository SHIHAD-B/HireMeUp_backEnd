import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";


export const updateStatusController = (dependencies: IDependencies) => {
    const { useCases: { updateStatusUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const eData = req.body

            if (!eData.status || !eData.id) {
                return next(ErrorResponse.conflict("required data is missing..."))
            } else {

                const applicant: IApplicants[] | boolean | null = await updateStatusUseCase(dependencies).execute(eData.id, eData.status)
                if (!applicant) {
                    return next(ErrorResponse.conflict("failed to update status"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: applicant,
                        message: "status updated successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
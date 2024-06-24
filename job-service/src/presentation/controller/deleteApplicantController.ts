import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";



export const deleteApplicantController = (dependencies: IDependencies) => {
    const { useCases: { deleteApplicantsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id
            if (!id) {
                return next(ErrorResponse.badRequest("credential is missing"))
            } else {

                const applicant: IApplicants | boolean | null = await deleteApplicantsUseCase(dependencies).execute(id)
                if (!applicant) {
                    return next(ErrorResponse.forbidden("failed to delete applicant"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: applicant,
                        message: "applicant delete successfully..."
                    })
                }
            }

        }

        catch (error) {
            next(error)

        }
    }
}
import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import { addApplicantsValidation } from "../../utils/validation/addApplicantsValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";



export const addApplicantController = (dependencies: IDependencies) => {
    const { useCases: { addApplicantsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { value, error } = addApplicantsValidation.validate(req.body)

            if (error) {
                return next(ErrorResponse.conflict(String(error)))
            } else {

                const applicant: IApplicants | boolean | null = await addApplicantsUseCase(dependencies).execute(value)
                if (!applicant) {
                    return next(ErrorResponse.badRequest("already applied.."))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: applicant,
                        message: "applicant added successfully..."
                    })
                }


            }

        }

        catch (error) {
            next(error)

        }
    }
}
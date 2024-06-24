import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import { addApplicantsValidation } from "../../utils/validation/addApplicantsValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";

/**
 * addApplicantController - Controller function to handle adding applicants using the addApplicantsUseCase.
 * 
 * This controller:
 * 1. Validates the incoming request body using addApplicantsValidation.
 *    - If validation fails, returns a conflict error with the validation message.
 * 2. Executes the addApplicantsUseCase to add the applicant based on the validated data.
 *    - If the applicant is already applied, returns a bad request error.
 * 3. Returns a success response with the added applicant data if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


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
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";

/**
 * deleteApplicantController - Controller function to handle deleting an applicant using deleteApplicantsUseCase.
 * 
 * This controller:
 * 1. Extracts the applicant ID from the request body.
 *    - If ID is missing, returns a bad request error.
 * 2. Executes deleteApplicantsUseCase to delete the applicant based on the ID.
 *    - If deletion fails or applicant is not found, returns a forbidden error.
 * 3. Returns a success response with the deleted applicant if deletion is successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


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
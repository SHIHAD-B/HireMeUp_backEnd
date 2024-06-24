import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";

/**
 * applicantListController - Controller function to handle listing applicants using the listApplicantsUseCase.
 * 
 * This controller:
 * 1. Executes the listApplicantsUseCase to retrieve a list of applicants.
 *    - If listing applicants fails, returns a bad request error.
 * 2. Returns a success response with the list of applicants if successful.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */


export const applicantListController = (dependencies: IDependencies) => {
    const { useCases: { listApplicantsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const applicants: IApplicants[] | boolean | null = await listApplicantsUseCase(dependencies).execute()
            if (!applicants) {
                return next(ErrorResponse.badRequest("failed to list applicants.."))
            } else {
                return res.status(200).json({
                    success: true,
                    user: applicants,
                    message: "applicants listed successfully..."
                })
            }
        }

        catch (error) {
            next(error)

        }
    }
}
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";

/**
 * fetchApplicantsController - Controller function to handle fetching applicants by ID using fetchApplicantsUseCase.
 * 
 * This controller:
 * 1. Retrieves the ID parameter from the request params.
 *    - If ID is missing or undefined, returns a bad request error.
 * 2. Executes fetchApplicantsUseCase to retrieve applicants based on the ID.
 *    - If fetching fails, returns a bad request error.
 * 3. Returns a success response with the fetched applicants if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


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
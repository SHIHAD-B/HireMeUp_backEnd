import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * fetchPlansController - Controller function to handle fetching and listing plans.
 * 
 * This controller:
 * 1. Calls the `fetchPlansUseCase` to retrieve a list of plans from the database.
 *    - If no plans are found, returns a not found error.
 * 2. Returns a success response with the fetched plans upon successful retrieval.
 */


export const fetchPlansController = (dependencies: IDependencies) => {

    const { useCases: { fetchPlansUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
          

            const users = await fetchPlansUseCase(dependencies).execute()
            if (!users) {
                return next(ErrorResponse.notFound(" unable to list the plans."));
            } else {
               
                return res.status(200).json({
                    success: true,
                    user: users,
                    message: "plans listed successfully."
                });
            }

        } catch (error: any) {
            console.error("Error listing plans:", error);
            return next(ErrorResponse.internalError("Failed to list plans."));
        }
    }
}
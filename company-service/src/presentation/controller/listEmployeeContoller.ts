import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * listEmployeeController - Controller function to list all employees using the listEmployeeUseCase.
 * 
 * Steps:
 * 1. Executes the listEmployeeUseCase to retrieve the list of employees.
 * 2. Returns a not found error if the list of employees is empty or cannot be retrieved.
 * 3. Returns a success response with the list of employees upon successful retrieval.
 * 4. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const listEmployeeController = (dependencies: IDependencies) => {
    const { useCases: { listEmployeeUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            const listEmployee = await listEmployeeUseCase(dependencies).execute()
            if (!listEmployee) {
                return next(ErrorResponse.notFound("failed to fetch the employee list"));
            } else {
                return res.status(200).json({
                    success: true,
                    user: listEmployee,
                    message: "employee fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching emmployee:", error);
            return next(ErrorResponse.internalError("Failed to fetch emmployee."));
        }
    }
}
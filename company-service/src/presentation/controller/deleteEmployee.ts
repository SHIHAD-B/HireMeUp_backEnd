import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * deleteEmployeeController - Controller function to delete an employee.
 * 
 * Steps:
 * 1. Retrieves the employee ID from the request body.
 * 2. Validates that the employee ID is provided; otherwise, returns a bad request error.
 * 3. Executes the deleteEmployeeUseCase to delete the employee based on the provided ID.
 * 4. Returns a not found error if the employee is not found or unable to be deleted.
 * 5. Returns a success response with the deleted employee's information upon successful deletion.
 * 6. Logs any errors encountered during the process and passes them to the error handler middleware.
 * 
 */


export const deleteEmployeeController = (dependencies: IDependencies) => {
    const { useCases: { deleteEmployeeUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeId = req.body.id
            if (!employeeId) {
                return next(ErrorResponse.badRequest("Employee id is missing."));
            }
            const deletededdUser = await deleteEmployeeUseCase(dependencies).execute(employeeId)
            if (!deletededdUser) {
                return next(ErrorResponse.notFound("Employee not found or unable to delete Employee."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: deletededdUser,
                    message: "Employee deleted successfully."
                });
            }

        } catch (error: any) {
            console.error("Error deleting Employee:", error);
            return next(ErrorResponse.internalError("Failed to delete Employee."));
        }
    }
}
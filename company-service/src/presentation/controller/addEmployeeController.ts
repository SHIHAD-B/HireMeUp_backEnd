import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { addEmployeeValidation } from "../../utils/validation/addEmployeeValidation";

/**
 * addEmployeeController - Handles the addition of an employee using the addEmployeeUseCase.
 * 
 * This controller:
 * 1. Validates the incoming request body data using addEmployeeValidation.
 * 2. Returns a bad request error if validation fails, including all validation errors.
 * 3. Executes the addEmployeeUseCase to add a new employee based on the provided data.
 * 4. Returns a bad request error if the employee already exists.
 * 5. Returns an internal server error if adding the employee fails.
 * 6. Returns a success response with the added employee details upon successful addition.
 * 7. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const addEmployeeController = (dependencies: IDependencies) => {
    const { useCases: { addEmployeeUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;

            if (!data) {
                return next(ErrorResponse.badRequest("Employee data is missing."));
            }

            const { value, error } = addEmployeeValidation.validate(data, { abortEarly: false });

            if (error) {
                const errorMessages = error.details.map((detail: any) => detail.message).join(", ");
                return next(ErrorResponse.badRequest(errorMessages));
            }

            const addEmployee = await addEmployeeUseCase(dependencies).execute(value);

            if (addEmployee === false) {
                return next(ErrorResponse.badRequest("Employee already exists."));
            } else if (!addEmployee) {
                return next(ErrorResponse.internalError("Failed to add employee."));
            }

            return res.status(200).json({
                success: true,
                user: addEmployee,
                message: "Employee added successfully."
            });
        } catch (error: any) {
            console.error("Error adding employee:", error);
            return next(ErrorResponse.internalError("Failed to add employee."));
        }
    }
}

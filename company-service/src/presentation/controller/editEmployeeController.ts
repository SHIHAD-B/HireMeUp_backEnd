import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { editEmployeeValidation } from "../../utils/validation/editEmployeeValidation";


/**
 * editEmployeeController - Controller function to edit an employee's details.
 * 
 * Steps:
 * 1. Retrieves employee data from the request body.
 * 2. Validates that employee data is provided; otherwise, returns a bad request error.
 * 3. Removes sensitive fields from the employee data to avoid unintended updates.
 * 4. Validates the edited employee data format using editEmployeeValidation.
 *    - If validation fails, returns a bad request error with the validation message.
 * 5. Executes the editEmployeeUseCase to update the employee details based on the edited data.
 * 6. Returns a conflict error if the employee details are already up-to-date.
 * 7. Returns a not found error if the employee is not found or unable to be edited.
 * 8. Returns a success response with the updated employee's information upon successful edit.
 * 9. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const editEmployeeController = (dependencies: IDependencies) => {
    const { useCases: { editEmployeeUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;

            if (!data) {
                return next(ErrorResponse.badRequest("employee data is missing."));
            }
            delete data.deleted
            delete data.createdAt
            delete data.profile
            delete data.__v

            const { value, error } = editEmployeeValidation.validate(data, { abortEarly: false });
            
            if (error) {
                const errorMessages = error.details.map((detail: any) => detail.message).join(", ");
                return next(ErrorResponse.badRequest(errorMessages));
            }

            const editEmployee = await editEmployeeUseCase(dependencies).execute(value); 
            if(editEmployee===false){
                return next(ErrorResponse.conflict("employee details are upToDate"))
            }else if (!editEmployee) {
                return next(ErrorResponse.notFound("employee not found or unable to edit employee."));
            }

            return res.status(200).json({
                success: true,
                user: editEmployee,
                message: "Employee edited successfully."
            });
        } catch (error: any) {
            console.error("Error editing employee:", error);
            return next(ErrorResponse.internalError("Failed to edit employee."));
        }
    }
}

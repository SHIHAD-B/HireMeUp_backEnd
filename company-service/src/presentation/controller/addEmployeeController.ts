import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { addEmployeeValidation } from "../../utils/validation/addEmployeeValidation";

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

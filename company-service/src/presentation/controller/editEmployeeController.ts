import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { editEmployeeValidation } from "../../utils/validation/editEmployeeValidation";



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

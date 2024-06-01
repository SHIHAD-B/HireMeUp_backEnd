import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


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
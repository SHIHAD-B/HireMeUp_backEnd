import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


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
import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const listUserController = (dependencies: IDependencies) => {
    const { useCases: { listUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const users = await listUserUseCase(dependencies).execute()
            if (!users) {
                return next(ErrorResponse.notFound(" unable to list the user."));
            } else {
                return res.status(200).json({
                    success: true,
                    user: users,
                    message: "Users listed successfully."
                });
            }

        } catch (error: any) {
            console.error("Error listing user:", error);
            return next(ErrorResponse.internalError("Failed to list user."));
        }
    }
}
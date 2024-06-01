import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { JwtPayload } from "jsonwebtoken";

export const fetchUserController = (dependencies: IDependencies) => {
    const { useCases: { fetchUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = (req.user as JwtPayload) || {};

            if (!email) {
                return next(ErrorResponse.badRequest("User email is missing.....(controller)"));
            }
            const user = await fetchUserUseCase(dependencies).execute(email)
            if (!user) {
                return next(ErrorResponse.notFound("User not found or unable to fetch user."));
            } else if (user.blocked == true || user.deleted == true) {
                return res.status(200).json({
                    success: false,
                    user: null,
                    message: "user is blocked or deleted"
                });
            } else {
                return res.status(200).json({
                    success: true,
                    user: user,
                    message: "User fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching user:", error);
            return next(ErrorResponse.internalError("Failed to fetch user."));
        }
    }
}
import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig/config";

export const fetchUserController = (dependencies: IDependencies) => {
    const { useCases: { fetchUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("reached fetch user")
            const { user_token } = req.cookies;
            if (!user_token) {
                return next(ErrorResponse.badRequest("User token is missing."));
            }
            const deToken: any = jwt.verify(user_token, JWT_SECRET, (error: any, decode: any) => {
                if(error){
                    return null
                }
                return decode
            });
            const { email } = deToken

            if (!email) {
                return next(ErrorResponse.badRequest("User ID is missing."));
            }
            const user = await fetchUserUseCase(dependencies).execute(email)
            if (!user) {
                return next(ErrorResponse.notFound("User not found or unable to fetch user."));
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
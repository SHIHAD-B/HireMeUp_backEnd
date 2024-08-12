import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { signinValidation } from "../../utils/validation/loginValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { IRefreshToken, IUserEntity } from "../../domain/entities";
import { generateAccessToken } from "../../utils/generateToken/accessToken";
import { generateRefreshToken } from "../../utils/generateToken/refreshToken";

/**
 * signinUserController - Handles user sign-in process.
 * 
 * This controller:
 * 1. Validates the request data using signinValidation.
 * 2. Checks if the user exists and the credentials are correct using signinUserUseCase.
 * 3. If the credentials are incorrect or the user is not found:
 *    - Returns appropriate error responses.
 * 4. If the user is blocked or deleted:
 *    - Returns an error response indicating the user is blocked or deleted by admin.
 * 5. If the credentials are correct:
 *    - Generates an access token and a refresh token.
 *    - Stores the refresh token using storeRefreshTokenUseCase.
 *    - Sets the access token in an HTTP-only cookie.
 *    - Returns a success response with the user details, access token, and refresh token.
 */


export const signinUserController = (dependencies: IDependencies) => {
    const { useCases: { signinUserUseCase, storeRefreshTokenUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = signinValidation.validate(req.body);
            if (error) {
                return next(ErrorResponse.conflict(String(error)));
            }

            const data = value;
            const User: IUserEntity | boolean | null = await signinUserUseCase(dependencies).execute(data);
            if (User == false || User == true) {
                return next(ErrorResponse.badRequest('incorrect password'));
            } else if (User == null) {
                return next(ErrorResponse.badRequest('user not found'));
            } else if (User.blocked || User.deleted) {
                return next(ErrorResponse.badRequest('user blocked or deleted by admin'));
            } else {
                const accessToken = generateAccessToken(User);
                const refreshToken: IRefreshToken = await generateRefreshToken(User);

                await storeRefreshTokenUseCase(dependencies).execute(refreshToken);

                res.cookie('user_token', accessToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true
                });

                res.status(200).json({
                    success: true,
                    user: User,
                    accessToken,
                    refreshToken: refreshToken.token,
                    message: "user authenticated",
                });
            }
        } catch (error: any) {
            next(error);
        }
    };
};

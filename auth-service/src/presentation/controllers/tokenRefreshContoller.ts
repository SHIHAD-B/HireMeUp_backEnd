import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import Jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import ErrorResponse from "../../utils/error/errorResponse";
import { generateAccessToken } from "../../utils/generateToken/accessToken";
import { IUserEntity, ICompany, IAdminEntity } from "../../domain/entities";
import { JWT_SECRET } from "../../config/envConfig/config";
import RefreshToken from "../../infrastructure/database/mongoDB/model/refreshTokenSchema";

export const tokenRefreshController = (dependencies: IDependencies) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tokenName = req.cookies['user_token'] ? 'user_token' :
                req.cookies['company_token'] ? 'company_token' :
                    req.cookies['admin_token'] ? 'admin_token' : null;

            if (!tokenName) {
                return next(ErrorResponse.unauthorized('Cannot find token'));
            }

            const accessToken = req.cookies[tokenName];

            if (!accessToken) {
                return next(ErrorResponse.unauthorized('Access token not provided'));
            }

            let decodedAccessToken: IUserEntity | ICompany | IAdminEntity | null = null;
            try {
                decodedAccessToken = Jwt.verify(accessToken, JWT_SECRET) as IUserEntity | ICompany | IAdminEntity;

                
                return res.status(200).json({
                    success: true,
                    user: decodedAccessToken,
                    message: "Access token is still valid"
                });
            } catch (err: any) {
                if (err instanceof TokenExpiredError) {
                    
                } else if (err instanceof JsonWebTokenError) {
                    return next(ErrorResponse.unauthorized('Invalid access token'));
                } else {
                    return next(ErrorResponse.internalError('An error occurred while verifying access token'));
                }
            }

         
            decodedAccessToken = Jwt.decode(accessToken) as IUserEntity | ICompany | IAdminEntity;

            if (!decodedAccessToken) {
                return next(ErrorResponse.unauthorized('Invalid access token data'));
            }

            const userId = decodedAccessToken._id;
            const refreshData = await RefreshToken.findOne({ coreId: userId });

            if (!refreshData) {
                return next(ErrorResponse.unauthorized('Refresh token not found'));
            }

            const { token: refreshToken, expiryDate } = refreshData;
            const now = new Date();
            if (expiryDate < now) {
                return next(ErrorResponse.unauthorized('Refresh token expired'));
            }

            const newAccessToken = generateAccessToken(decodedAccessToken);
            res.cookie(tokenName, newAccessToken, {
                httpOnly: true,
            });

            res.status(200).json({
                success: true,
                user: decodedAccessToken,
                message: "Access token refreshed"
            });
        } catch (error: any) {
            next(error);
        }
    };
};

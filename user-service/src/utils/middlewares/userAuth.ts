import jwt from 'jsonwebtoken';
import ErrorResponse from '../error/errorResponse';
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from '../../config/envConfig/config';

export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_token } = req.cookies;

        if (!user_token) {
            return next(ErrorResponse.badRequest("User token is missing."));
        } else {
            const decoded = jwt.verify(user_token, JWT_SECRET);
            req.user = decoded;
        }

        next();
    } catch (err) {
        return next(ErrorResponse.unauthorized("Invalid or expired user token."));
    }
};

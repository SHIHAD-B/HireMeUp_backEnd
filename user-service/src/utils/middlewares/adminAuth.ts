import jwt from 'jsonwebtoken';
import ErrorResponse from '../../utils/error/errorResponse';
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from '../../config/envConfig/config';

export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
       
        const { admin_token } = req.cookies;

        if (!admin_token) {
          
            return next(ErrorResponse.badRequest("admin token is missing........"));
        }

        const decoded = jwt.verify(admin_token, JWT_SECRET);

        if (!decoded) {
            return next(ErrorResponse.badRequest("Invalid admin token."));
        }

        req.admin = decoded;

        next();
    } catch (err) {

        return next(ErrorResponse.unauthorized("Invalid or expired admin token."));
    }
};


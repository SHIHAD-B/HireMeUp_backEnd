import jwt from 'jsonwebtoken';
import ErrorResponse from '../../utils/error/errorResponse';
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from '../../config/envConfig/config';

export const companyAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
       
        const { Company_token } = req.cookies;

        if (!Company_token) {
          
            return next(ErrorResponse.badRequest("company token is missing."));
        }

        const decoded = jwt.verify(Company_token, JWT_SECRET);

        if (!decoded) {
            return next(ErrorResponse.badRequest("Invalid company token."));
        }

        req.company = decoded;

        next();
    } catch (err) {

        return next(ErrorResponse.unauthorized("Invalid or expired admin token."));
    }
};


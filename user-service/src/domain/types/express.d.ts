import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload | string;
        company?: JwtPayload | string;
        admin?: JwtPayload | string;
        
    }
}

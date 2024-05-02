import { verify, JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig/config";


export const verifyToken = async (token: string): Promise<string | boolean | JwtPayload> => {
    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        return decoded ? decoded : false;
    } catch (error: any) {
        throw new Error(error);
    }
};

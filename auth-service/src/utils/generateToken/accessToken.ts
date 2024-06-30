import { JWT_SECRET } from "../../config/envConfig/config";
import Jwt from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
    const payload = {
        _id: String(user?._id),
        email: user?.email!,
        role: user?.role!
    };
    return Jwt.sign(
        payload,
        String(JWT_SECRET),
        { expiresIn: '30m' }
    );
};


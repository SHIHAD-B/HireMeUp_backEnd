import Jwt from 'jsonwebtoken';
import { JWT_REFRESH_SECRET } from '../../config/envConfig/config';

export const generateRefreshToken = async (user: any): Promise<any> => {
    const payload = {
        _id: String(user._id),
        email: user.email,
        role: user.role,
    };

    const refreshToken = Jwt.sign(
        payload,
        String(JWT_REFRESH_SECRET),
        { expiresIn: '7d' }
    );

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    const data = {
        token: String(refreshToken),
        coreId: user._id,
        expiryDate: new Date(expiryDate)
    }


    return data;
};

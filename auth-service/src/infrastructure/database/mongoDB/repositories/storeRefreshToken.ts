
import { IRefreshToken } from "../../../../domain/entities";
import RefreshToken from "../model/refreshTokenSchema";

export const storeRefreshToken = async (data: IRefreshToken): Promise<IRefreshToken | boolean | null> => {
    try {
        if (!data || !data.token || !data.coreId || !data.expiryDate) {
            return null;
        }

        const updatedRefreshToken = await RefreshToken.findOneAndUpdate(
            { coreId: data.coreId },
            {
                token: data.token,
                expiryDate: data.expiryDate,
            },
            { new: true, upsert: true } 
        );

        return updatedRefreshToken;
    } catch (error: any) {
        throw new Error(error);
    }
};

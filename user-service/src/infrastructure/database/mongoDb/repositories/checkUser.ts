import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";
import { ICheckUserInput } from "../../../../domain/entities";


export const checkUser = async (data: ICheckUserInput): Promise<IUsers | null> => {
    try {
    
        if (!data.email && !data.phone) {
            return null;
        }
        let user = null;
        if (data.email) {
            user = await Users.findOne({ email: data.email });
            if (user) return user

        }
        if (data.phone) {
            user = await Users.findOne({ phone: parseFloat(data.phone) });
            if (user) return user
        }

        return user;
    } catch (error: any) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user.');
    }
};

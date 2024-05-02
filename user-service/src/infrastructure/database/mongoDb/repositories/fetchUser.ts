import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";
export const fetchUser = async (email: string): Promise<IUsers | null> => {
    try {
        if (!email) {
        return null
        }
        const user = await Users.findOne({ email: email })
        if (!user) {
            return null
        }
        return user
    } catch (error: any) {
        console.error('Error fetching  user:', error);
        throw new Error('Failed to fetch user.');
    }
}
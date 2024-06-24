import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";
export const fetchUserWithId = async (id: string): Promise<IUsers | null> => {
    try {
        if (!id) {
        return null
        }
        const user = await Users.findOne({ _id: id })
        if (!user) {
            return null
        }
        return user
    } catch (error: any) {
        console.error('Error fetching  user:', error);
        throw new Error('Failed to fetch user.');
    }
}
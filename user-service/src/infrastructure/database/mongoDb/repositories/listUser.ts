import { IUsers } from "../../../../domain/entities/user.entity";
import Users from "../model/userSchema";

export const listUser = async (): Promise<IUsers[] | null> => {
    try {
        const users = await Users.find()
        if (!users) {
          return null
        }
        return users
    } catch (error: any) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user.');
    }
}
import { IUsers } from "../../../../domain/entities/user.entity";
import Users from "../model/userSchema";

export const addUser = async (data: IUsers): Promise<IUsers | null> => {
    try {
        if (!data) {
           return null
        }
        data = {
            ...data, 
            blocked: data?.blocked ?? false,
            deleted: data?.deleted ?? false
        };
        

        const user = await Users.create(data);
        return user;
    } catch (error:any) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user..');
    }
};

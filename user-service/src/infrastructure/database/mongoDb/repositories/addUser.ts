import { IUsers } from "../../../../domain/entities/user.entity";
import Users from "../model/userSchema";

export const addUser = async (data: IUsers): Promise<IUsers | null | boolean> => {
    try {
        if (!data) {
            return null
        }
        console.log(data, "data when add user data")

        data = {
            ...data,
            blocked: data?.blocked ?? false,
            deleted: data?.deleted ?? false
        };
        let userExist=null
        if (data?.phone!==undefined && data?.phone!==null){
           userExist = await Users.findOne({
                $or: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            });

        }


        if (userExist) {
            return false
        }

        const user = await Users.create(data);
        return user;
    } catch (error: any) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user..');
    }
};

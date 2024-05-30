import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";

export const updateUser = async (data: IUsers): Promise<IUsers | null> => {
    try {
        console.log(data,"data in the edit repo")
        if (!data) {
            return null
        }

        const user = await Users.findOne({ _id: data._id });
        if (!user) {
            return null
        }

        const result = await Users.updateOne({ _id: data._id }, data, { new: true });
        if (result.modifiedCount === 0) {
            return null
        }

        return await Users.findOne({ _id: data._id }); 

    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user.');
    }
};

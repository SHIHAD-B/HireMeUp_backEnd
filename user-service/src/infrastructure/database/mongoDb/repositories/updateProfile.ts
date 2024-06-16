import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";

export const updateProfile = async (id: string, data: string, field: string): Promise<IUsers | null> => {
    try {
        if (!data) {
            return null
        }

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }

        const updateData: { [key: string]: string } = {};
        updateData[field] = data;

        const result = await Users.updateOne({ _id: id }, { $set: updateData }, { new: true });
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user.');
    }
};

import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";

export const addResume = async (id: string, resume: string): Promise<IUsers | null> => {
    try {
        if (!resume || !id) {
            return null
        }

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }


        const result = await Users.updateOne({ _id: id }, { $set:{cv:resume} }, { new: true });
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error) {
        console.error('Error adding resume', error);
        throw new Error('Failed to add resume.');
    }
};

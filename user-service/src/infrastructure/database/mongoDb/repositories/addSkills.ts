import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";


export const addSkill = async (id: string, skill: string): Promise<IUsers | null> => {
    try {
        if (!skill) {
            return null
        }

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }

        const result = await Users.updateOne({ _id: id }, { $push:{skills:skill} }, { new: true });
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error:any) {
        console.error('Error adding skill', error);
        throw new Error('Failed to add skill.');
    }
};

import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";


export const addLanguage = async (id: string, lang: string): Promise<IUsers | null> => {
    try {
        if (!lang) {
            return null
        }

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }

        const result = await Users.updateOne({ _id: id }, { $push:{language:lang} }, { new: true });
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error:any) {
        console.error('Error adding language', error);
        throw new Error('Failed to add language.');
    }
};

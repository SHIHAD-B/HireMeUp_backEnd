import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";
import { ISocialLink } from "../../../../domain/entities/socialLink.entity";

export const editSocialLink = async (id: string, data: ISocialLink): Promise<IUsers | null> => {
    try {
        if (!data) {
            return null
        }

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }


        const result = await Users.updateOne({ _id: id, },{ $set: {contacts:data} },);
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error) {
        console.error('Error editing socialLinks:', error);
        throw new Error('Failed to edit socialLinks.');
    }
};

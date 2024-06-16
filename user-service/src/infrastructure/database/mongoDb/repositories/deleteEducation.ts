import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";


export const deleteEducation = async (userId: string, id: string): Promise<IUsers | null> => {
    try {
        if (!userId || !id) {
            return null
        }
      

        const user = await Users.findOne({ _id: userId });
        if (!user) {
            return null
        }
     


        const result = await Users.updateOne({ _id: userId }, { $pull: { education: { _id: id } } }, { new: true });
     
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: userId });


    } catch (error) {
        console.error('Error deleting education:', error);
        throw new Error('Failed to delete education.');
    }
};

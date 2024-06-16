import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";


export const deleteSkill = async (id: string, skill:string): Promise<IUsers | null> => {
    try {
        if (!id || !skill) {
            return null
        }
      

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }
     


        const result = await Users.updateOne({ _id: id }, { $pull: { skills: skill } }, { new: true });
     
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error) {
        console.error('Error deleting skill:', error);
        throw new Error('Failed to delete skill.');
    }
};

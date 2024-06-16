import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";
import { IExperience } from "../../../../domain/entities/experience.entity";

export const editExperience = async (id: string, data: IExperience): Promise<IUsers | null> => {
    try {
        if (!data) {
            return null
        }

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }


        const result = await Users.updateOne(
            { _id: id, "experiences._id": data._id },
            { $set: { "experiences.$": data } },
            { new: true }
        );
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error) {
        console.error('Error editing experience:', error);
        throw new Error('Failed to edit experience.');
    }
};

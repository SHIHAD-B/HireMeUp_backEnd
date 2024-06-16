import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";
import { IEducation } from "../../../../domain/entities/education.entities";

export const editEducation = async (id: string, data: IEducation): Promise<IUsers | null> => {
    try {
        if (!data) {
            return null
        }

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }


        const result = await Users.updateOne(
            { _id: id, "education._id": data._id },
            { $set: { "education.$": data } },
            { new: true }
        );
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error) {
        console.error('Error editing educaiton:', error);
        throw new Error('Failed to edit educaiton.');
    }
};

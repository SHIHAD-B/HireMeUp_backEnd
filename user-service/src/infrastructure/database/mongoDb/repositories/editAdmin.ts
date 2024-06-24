
import { IAdmin } from "../../../../domain/entities";
import Admin from "../model/adminSchema";

export const editAdmin = async (data: IAdmin): Promise<IAdmin | null> => {
    try {
        if (!data) {
            return null
        }

        const user = await Admin.findOne({ _id: data._id });
        if (!user) {
            return null
        }


        const result = await Admin.updateOne({ _id: data._id }, { $set: data },
            { new: true }
        );
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Admin.findOne({ _id: data._id });


    } catch (error) {
        console.error('Error editing admin:', error);
        throw new Error('Failed to edit admin.');
    }
};

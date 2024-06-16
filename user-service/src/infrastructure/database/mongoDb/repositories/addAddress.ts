import Users from "../model/userSchema";
import { IUsers } from "../../../../domain/entities/user.entity";
import { IAddress } from "../../../../domain/entities/address.entity";

export const addAddress = async (id: string, data: IAddress): Promise<IUsers | null> => {
    try {
        if (!data || !id) {
            return null
        }

        const user = await Users.findOne({ _id: id });
        if (!user) {
            return null
        }


        const result = await Users.updateOne({ _id: id }, { $set:{address:data} }, { new: true });
        if (result.modifiedCount === 0) {
            return null;
        }

        return await Users.findOne({ _id: id });


    } catch (error) {
        console.error('Error adding address', error);
        throw new Error('Failed to add address.');
    }
};

import { ISubscription } from "../../../../domain/entities/subscription.entity";
import { IUsers } from "../../../../domain/entities/user.entity";
import Users from "../model/userSchema";

export const addSubscription = async (data: ISubscription): Promise<IUsers | null | boolean> => {
    try {
        console.log(data,"data from the rab")

        if (!data) {
            return null;
        }

        const user = await Users.findOne({ _id: data.userId });
    

        if (!user) {
            return false;
        }
        

        const subscriptionData = {
            subscriptionId: data.subscriptionId,
            planId: data.planId,
            name: data.name,
            end_date: data.end_date,
            start_date: new Date(),
            createdAt: new Date()
        };
       

        const updateResult = await Users.updateOne(
            { _id: data.userId },
            { $set: { subscription: subscriptionData } }
        );

        if (updateResult.modifiedCount > 0) {
         
            return await Users.findOne({ _id: data.userId });
        } else {
            return null;
        }
    } catch (error: any) {
        console.error('Error adding subscription:', error);
        throw new Error('Failed to add subscription.');
    }
};

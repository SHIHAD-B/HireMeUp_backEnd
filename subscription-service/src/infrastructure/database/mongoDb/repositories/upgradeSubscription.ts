import Plans from "../model/planSchema";
import { ISubscriptions } from "../../../../domain/entities";
import Subscriptions from "../model/subscriptionSchema";
import { IPlans } from "../../../../domain/entities/plan.entity";


export const upgradeSubscription = async (data: ISubscriptions): Promise<ISubscriptions | boolean | null> => {
    try {
    
        if (!data || !data._id || !data.userId) return null

        const plan = await Plans.findOne({ _id: data._id })
        if (!plan) return false

        const durationInMilliseconds = plan?.duration * 24 * 60 * 60 * 1000;

        const upSub = {
            userId: data.userId,
            planId: data._id,
            start_date: new Date(),
            createdAt: new Date(),
            end_date: new Date(Date.now() + durationInMilliseconds),
            status: "active"
        }
       
        

        const upgradeSub = await Subscriptions.create(upSub)
        if (upgradeSub) {
          
            
            return upgradeSub
        }
       
        return null

    } catch (error: any) {
        console.error('Error upgrading subscription:', error);
        throw new Error('Failed to upgrade subscription..');
    }
};

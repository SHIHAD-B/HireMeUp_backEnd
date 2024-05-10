import { IPlans } from "../../../../domain/entities/plan.entity";
import Plans from "../model/planSchema";

export const addPlans = async (data: IPlans): Promise<IPlans | null> => {
    try {
        if (!data) {
            return null
        }
        const plandata = {
            ...data,
            deleted: false
        }
        const plans = await Plans.create(plandata);
        return plans;
    } catch (error: any) {
        console.error('Error adding plans:', error);
        throw new Error('Failed to add plans..');
    }
};

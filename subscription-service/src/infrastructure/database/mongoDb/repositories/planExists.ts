import { IPlans } from "../../../../domain/entities/plan.entity";
import Plans from "../model/planSchema";

export const PlanExists = async (name: string): Promise<IPlans[] | null> => {
    try {

        const plans: any = await Plans.findOne({ name: name })

        if (plans) {
            return plans
        }
        return null
    } catch (error: any) {
        console.error('Error getting plan:', error);
        throw new Error('Failed to get plan..');
    }
};

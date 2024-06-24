import { IPlans } from "../../../../domain/entities/plan.entity";
import Plans from "../model/planSchema";

export const PlanExists = async (name: string): Promise<IPlans[] | null> => {
    try {

        const plans: IPlans[] | null = await Plans.findOne({ name: name })

        if (plans) {
            return plans ? plans : null
        }
        return null
    } catch (error: any) {
        console.error('Error getting plan:', error);
        throw new Error('Failed to get plan..');
    }
};

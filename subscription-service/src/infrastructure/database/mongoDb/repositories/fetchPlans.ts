import { IPlans } from "../../../../domain/entities/plan.entity";
import Plans from "../model/planSchema";

export const fetchPlans = async (): Promise<IPlans[] | null> => {
    try {
       
        const plans = await Plans.find()
        
        return plans;
    } catch (error: any) {
        console.error('Error fetching plans:', error);
        throw new Error('Failed to fetch plans..');
    }
};

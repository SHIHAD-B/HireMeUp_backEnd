import { IPlans } from "../../../../domain/entities/plan.entity";
import Plans from "../model/planSchema";

export const editPlans = async (data: IPlans): Promise<boolean | null> => {
    try {
        if (!data) {
            return null
        }
        data.editedAt = new Date()
        const plans = await Plans.updateOne({ _id: data._id }, { $set: data });
        if (plans.modifiedCount == 1) {
            return true
        }

        return null
    } catch (error: any) {
        console.error('Error editing plans:', error);
        throw new Error('Failed to edit plans..');
    }
};

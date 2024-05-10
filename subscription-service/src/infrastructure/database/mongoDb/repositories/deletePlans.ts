import Plans from "../model/planSchema";

export const deletePlans = async (id: string): Promise<boolean | null> => {
    try {
        if (!id) {
            return null
        }
        const plans = await Plans.updateOne({ _id: id }, { deleted: true }, { new: true })

        return plans.modifiedCount > 0 ? true : false;
    } catch (error: any) {
        console.error('Error deleting plans:', error);
        throw new Error('Failed to delete plans..');
    }
};

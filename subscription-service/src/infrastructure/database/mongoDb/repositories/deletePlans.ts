import Plans from "../model/planSchema";

export const deletePlans = async (id: string): Promise<boolean | null> => {
    try {
        if (!id) {
            return null
        }
        const checkplan= await Plans.findOne({_id:id})
        if(!checkplan){
            return null
        }
        const plans = await Plans.updateOne({ _id: id }, { deleted: !checkplan.deleted }, { new: true })

        return plans.modifiedCount > 0 ? true : false;
    } catch (error: any) {
        console.error('Error deleting plans:', error);
        throw new Error('Failed to delete plans..');
    }
};

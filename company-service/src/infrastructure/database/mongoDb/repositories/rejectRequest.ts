import { ICompany } from "../../../../domain/entities";
import Requests from "../model/requestSchema";

export const rejectRequest = async (data: ICompany): Promise<boolean | null> => {
    try {
        if (!data) {
            return null;
        }

        const request = await Requests.findOne({ email: data.email });

        if (!request) {
            return null;
        }
       
            const updateResult = await Requests.updateOne({ email: data.email }, { $set: { approval: "rejected"} });
            if (updateResult.modifiedCount === 1) {
                return true;
            }
        


        return null;
    } catch (error: any) {
        console.error('Error approving request:', error.message);
        throw new Error('Failed to approve request.');
    }
};

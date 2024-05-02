import { ICompany } from "../../../../domain/entities";
import Company from "../model/companySchema";
import Requests from "../model/requestSchema";

export const approveRequest = async (data: ICompany): Promise<boolean | null> => {
    try {
        if (!data) {
            return null;
        }

        const company = await Company.create(data);

        if (!company) {
            return null;
        }

        const request = await Requests.findOne({ email: data.email });

        if (!request) {
            return null;
        }
        const updateResult = await Requests.updateOne({ email: data.email }, { $set: { approval: "approved", status: "completed" } });

        if (updateResult.modifiedCount === 1) {
            return true;
        }

        return null;
    } catch (error: any) {
        console.error('Error approving request:', error.message);
        throw new Error('Failed to approve request.');
    }
};

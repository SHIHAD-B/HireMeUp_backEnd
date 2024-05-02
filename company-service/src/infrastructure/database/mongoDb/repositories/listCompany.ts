import { ICompany } from "../../../../domain/entities";
import Company from "../model/companySchema";

export const listCompany = async (): Promise<ICompany[] | null> => {
    try {
        const companyList = await Company.find();

        if (companyList.length === 0) {
            return null; 
        }

        return companyList;
    } catch (error: any) {
        console.error('Error listing companies:', error.message);
        throw new Error('Failed to list companies.'); // Provide a generic error message
    }
};

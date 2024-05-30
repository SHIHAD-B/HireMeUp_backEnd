import { ICompany } from "../../../../domain/entities";
import Company from "../model/companySchema";


export const addCompany = async (data: ICompany): Promise<ICompany | null | boolean> => {
    try {
        if (!data) {
            return null;
        }
        const alreadyExist = await Company.findOne({ email: data.email })
        if (alreadyExist) {
            return false
        }

        const company = await Company.create({
            email: data.email,
            password: data.password,
            status: 'active',
            approval: 'approved',
            deleted: false,
            company_name: data.company_name,
        })

        if (!company) {
            return null;
        } else {
            return company
        }


    } catch (error: any) {
        console.error('Error approving request:', error.message);
        throw new Error('Failed to approve request.');
    }
};

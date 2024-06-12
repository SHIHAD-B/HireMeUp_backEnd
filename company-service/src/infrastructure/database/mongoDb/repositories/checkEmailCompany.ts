import Company from "../model/companySchema";
import { ICompany } from "../../../../domain/entities";
export const checkCompanyExist = async (email: string): Promise<ICompany | null> => {
    try {
        if (!email) {
        return null
        }
        const user = await Company.findOne({ email: email })
        if (!user) {
            
            return null
        }
        return user
    } catch (error: any) {
        console.error('Error fetching  user:', error);
        throw new Error('Failed to fetch user.');
    }
}
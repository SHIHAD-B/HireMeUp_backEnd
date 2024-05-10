

import Company from "../model/companySchema"

export const deleteCompany = async (email: string): Promise<boolean | null> => {
    try {
        if (!email) {
            return null
        }

        const company = await Company.findOne({ email: email })
        if (!company) {
            return null
        }

        const blockedCompany = await Company.updateOne({ email: email }, {
            status: "blocked",
            deleted: true
        }, { new: true })

        return blockedCompany.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error deleting company:', error);
        throw new Error('Failed to delete  company.');
    }

}
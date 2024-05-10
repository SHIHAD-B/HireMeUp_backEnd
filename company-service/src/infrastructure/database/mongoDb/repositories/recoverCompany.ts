

import Company from "../model/companySchema"

export const recoverCompany = async (email: string): Promise<boolean | null> => {
    try {
        if (!email) {
            return null
        }

        const company = await Company.findOne({ email: email })
        if (!company) {
            return null
        }

        const blockedCompany = await Company.updateOne({ email: email }, {
            status: "active",
            deleted: false
        }, { new: true })

        return blockedCompany.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error recover company:', error);
        throw new Error('Failed to recover  company.');
    }

}
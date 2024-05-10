

import Company from "../model/companySchema"

export const blockCompany = async (email: string): Promise<boolean | null> => {
    try {
        if (!email) {
          return null
        }

        const company = await Company.findOne({ email: email })
        if (!company) {
           return null
        }

        const blockedCompany = await Company.updateOne({ email: email }, {
            status: "blocked"
        }, { new: true })

        return blockedCompany.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error blocking company:', error);
        throw new Error('Failed to block  company.');
    }

}
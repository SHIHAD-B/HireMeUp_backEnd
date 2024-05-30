

import { ICompany } from "../../../../domain/entities"
import Company from "../model/companySchema"

export const editCompany = async (data: ICompany): Promise<ICompany | null> => {
    try {
        if (!data?.email) {
            return null
        }

        const company = await Company.findOne({ email: data.email })
        if (!company) {
            return null
        }

        const updateCompany = await Company.updateOne({ email: data.email }, data, { new: true })

        if (updateCompany.modifiedCount > 0) {
            return await Company.findOne({ email: data.email })

        } else {
            return null
        }



    } catch (error: any) {
        console.error('Error editing company:', error);
        throw new Error('Failed to edit  company.');
    }

}
import { ICompany, IContact } from "../../../../domain/entities";
import Company from "../model/companySchema";



export const addContactLinks = async (data: IContact): Promise<ICompany | null | false> => {
    try {
        if (!data || !data.userId) {
            return null
        }

        const userExist = await Company.findOne({ _id: data.userId })
        if (!userExist) {
            return false
        }

        const setData = {
            instagram: data.instagram,
            linkedIn: data.linkedIn,
            twitter: data.twitter
        }

        const updateContact = await Company.updateOne({ _id: data.userId }, { $set: { contact: setData } })
        if (updateContact.modifiedCount == 0) {
            return false
        }

        const updatedCompany = await Company.findOne({ _id: data.userId })
        return updatedCompany


    } catch (error: any) {
        console.error('Error adding request:', error);
        throw new Error('Failed to add request..');
    }
}

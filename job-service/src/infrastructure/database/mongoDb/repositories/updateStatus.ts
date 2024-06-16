import { IApplicants, } from "../../../../domain/entities";
import Applicants from "../model/applicantsSchema";


export const updateStatus = async (id: string, status: string): Promise<IApplicants[] | null> => {
    try {
        if (!id || !status) {
            return null
        }

        const editedStatus = await Applicants.updateOne({ _id: id }, { $set: { hiring_status: status } });
        if (editedStatus.modifiedCount === 0) {
            return null
        }

        return await Applicants.find()

    } catch (error) {
        console.error('error occured in editing job', error)
        throw new Error('Failed to edit job')
    }
}
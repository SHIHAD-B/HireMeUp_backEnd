import { IApplicants } from "../../../../domain/entities";
import Applicants from "../model/applicantsSchema";



export const addNotes = async (data: IAddNote): Promise<IApplicants | null> => {
    try {
        if (!data) {
            return null
        }
        const exist = await Applicants.findOne({ _id: data.id })
        if (!exist) {
            return null
        }
        const push = {
            name: data.employee,
            notes: data.notes,
        }

        const updateApplicant = await Applicants.updateOne({ _id: data.id }, { $addToSet:{hiring_info:push}})
        if (updateApplicant.modifiedCount == 0) {
            return null
        }

        const updatedData = await Applicants.findOne({ _id: data.id })
        return updatedData ? updatedData : null

    } catch (error: any) {
        console.error("error in adding job ", error)
        throw new Error('Failed to add job..')
    }
}
import { IApplicants } from "../../../../domain/entities";
import Applicants from "../model/applicantsSchema";

export const addApplicants = async (data: IApplicants): Promise<IApplicants | null> => {
    try {
        if (!data) {
            return null
        }
        const AlreadyExist = await Applicants.findOne({ jobId: data.jobId, userId: data.userId })
        if (AlreadyExist) {
            return null
        }

        const addedApplicants = await Applicants.create(data)
        return addedApplicants

    } catch (error: any) {
        console.error("error occured in adding applicants", error)
        throw new Error('Failed to add applicants...')
    }
}
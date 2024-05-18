import { IApplicants } from "../../../../domain/entities";
import Applicants from "../model/applicantsSchema";

export const listApplicants = async (): Promise<IApplicants[] | null> => {
    try {
        const applicantsList = await Applicants.find()
        return applicantsList ? applicantsList : null
    } catch (error: any) {
        console.error('error in listing the application', error)
        throw new Error('Failed to list the applicants..')
    }
}
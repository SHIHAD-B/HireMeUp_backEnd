import { IApplicants } from "../../../../domain/entities";
import Applicants from "../model/applicantsSchema";

export const fetchApplicants = async (id: string): Promise<IApplicants[] | null> => {
    try {
        const applicantsListCompany = await Applicants.find({ companyId: id })
        if (!applicantsListCompany) {
            const applicantListUser = await Applicants.find({ userId: id })
            return applicantListUser ? applicantListUser : null
        }
        return applicantsListCompany ? applicantsListCompany : null
    } catch (error: any) {
        console.error('error in listing the application', error)
        throw new Error('Failed to list the applicants..')
    }
}
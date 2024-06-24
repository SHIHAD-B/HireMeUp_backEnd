import { IApplicants } from "../../../../domain/entities";
import Applicants from "../model/applicantsSchema";

export const fetchApplicants = async (id: string): Promise<IApplicants[] | null> => {
    try {
        if(!id || id==undefined){
            return null
        }
        const applicantsListCompany = await Applicants.find({ companyId: id })
        if (!applicantsListCompany.length) {
            const applicantListUser = await Applicants.find({ userId: id })
            return applicantListUser ? applicantListUser : null
        }
        return applicantsListCompany ? applicantsListCompany : null
    } catch (error: any) {
        console.error('error in fetching the application', error)
        throw new Error('Failed to fetching the applicants..')
    }
}
import Applicants from "../model/applicantsSchema"

export const deleteApplicant = async (id: string): Promise<boolean | null> => {
    try {

        if (!id) {
            return null
        }
        const deletedApplicant = await Applicants.updateOne({ _id: id }, { deleted: true })

        return deletedApplicant.modifiedCount > 0 ? true : false

    } catch (error) {
        console.error('error occured in deleting applicant', error)
        throw new Error('Failed to delete applicant')
    }

}
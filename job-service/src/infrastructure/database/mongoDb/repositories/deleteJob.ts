import Jobs from "../model/jobSchema";

export const deleteJob = async (id: string): Promise<boolean | null> => {
    try {
        if (!id) {
            return null
        }

        const deletedjob = await Jobs.updateOne({ _id: id }, { deleted: true })

        return deletedjob.modifiedCount > 0 ? true : false

    } catch (error: any) {
        console.error("error occured in deleting job", error)
        throw new Error('Failed to delete job..')
    }
}
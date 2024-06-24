import { IJobs } from "../../../../domain/entities";
import Jobs from "../model/jobSchema";

export const publishUnpublishJob = async (id: string): Promise<IJobs | null> => {
    try {
        if (!id) {
            return null
        }
        const data = await Jobs.findOne({ _id: id })
        if (!data) {
            return null
        }

        const editedJob = await Jobs.updateOne({ _id: id }, { $set: { publish: !data.publish } });
        if (editedJob.modifiedCount === 0) {
            return null
        }

        return await Jobs.findOne({ _id: id })

    } catch (error) {
        console.error('error occured in editing job publish', error)
        throw new Error('Failed to edit job publish')
    }
}
import { IJobs } from "../../../../domain/entities";
import Jobs from "../model/jobSchema";

export const editJob = async (data: IJobs): Promise<IJobs | null> => {
    try {
        if (!data) {
            return null
        }

        const editedJob = await Jobs.updateOne({ _id: data._id }, data);
        if (editedJob.modifiedCount === 0) {
            return null
        }

        return await Jobs.findOne({ _id: data._id })

    } catch (error) {
        console.error('error occured in editing job', error)
        throw new Error('Failed to edit job')
    }
}
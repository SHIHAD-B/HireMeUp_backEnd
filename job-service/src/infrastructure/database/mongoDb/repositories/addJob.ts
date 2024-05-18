import { IJobs } from "../../../../domain/entities";
import Jobs from "../model/jobSchema";

export const addJob = async (data: IJobs): Promise<IJobs | null> => {
    try {
        if (!data) {
            return null
        }
        const jobs = await Jobs.create(data)
        return jobs

    } catch (error: any) {
        console.error("error in adding job ", error)
        throw new Error('Failed to add job..')
    }
}
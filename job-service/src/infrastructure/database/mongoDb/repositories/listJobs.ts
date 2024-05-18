import { IJobs } from "../../../../domain/entities";
import Jobs from "../model/jobSchema";

export const listJobs = async (): Promise<IJobs[] | null> => {
    try {
        const jobList = await Jobs.find()
        return jobList ? jobList : null

    } catch (error: any) {
        console.error('error occured in listing the jobs', error)
        throw new Error('Failed to list the jobs...')
    }
}
import { ISchedule } from "../../../../domain/entities/schedule.entity";
import Applicants from "../model/applicantsSchema";
import Schedule from "../model/scheduleSchema";
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const scheduleInterview = async (data: ISchedule): Promise<ISchedule | null | boolean> => {
    try {
        if (!data) {
            return null;
        }

        const applicant = await Applicants.findOne({ jobId: data.jobId, userId: data.userId, companyId: data.companyId })
        if (!applicant || applicant.hiring_status=="rejected") {
            return false
        }


        const existingSchedules = await Schedule.find({ userId: data.userId, companyId: data.companyId });

        const newDate: Dayjs = dayjs(String(data.date));
        const hasConflict = existingSchedules.some((item) => {
            const existingDate: Dayjs = dayjs((item as any).date as string);
            return newDate.isBetween(existingDate.subtract(30, 'minute'), existingDate.add(30, 'minute'), null, '[]');
        });

        if (hasConflict) {
            return null;
        }
        
        const updateApplicant= await Applicants.updateOne({ jobId: data.jobId, userId: data.userId, companyId: data.companyId },{$set:{hiring_status:"interview"}})
        
        
        const addedApplicants = await Schedule.create(data);
      
        return addedApplicants;

    } catch (error: any) {
        console.error("error occurred in adding schedule", error);
        throw new Error('Failed to add schedule...');
    }
};

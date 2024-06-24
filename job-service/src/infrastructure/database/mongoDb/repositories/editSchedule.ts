import { ISchedule } from "../../../../domain/entities/schedule.entity";
import Schedule from "../model/scheduleSchema";
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const editSchedule = async (data: ISchedule): Promise<ISchedule | null> => {
    try {
        if (!data) {
            return null;
        }

      
        const existingSchedules = await Schedule.find({ 
            userId: data.userId, 
            companyId: data.companyId,
            _id: { $ne: data._id }  
        });

        const newDate: Dayjs = dayjs(String(data.date));
        const hasConflict = existingSchedules.some((item) => {
            const existingDate: Dayjs = dayjs((item as any).date as string);
            return newDate.isBetween(existingDate.subtract(30, 'minute'), existingDate.add(30, 'minute'), null, '[]');
        });

        if (hasConflict) {
            return null;
        }

        
        const editedJob = await Schedule.updateOne({ _id: data._id }, data);
        if (editedJob.modifiedCount === 0) {
            return null;
        }

       
        return await Schedule.findOne({ _id: data._id });

    } catch (error) {
        console.error('error occurred in editing schedule', error);
        throw new Error('Failed to edit schedule');
    }
};

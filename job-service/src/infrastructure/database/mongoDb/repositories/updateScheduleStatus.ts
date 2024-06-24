import { ISchedule } from "../../../../domain/entities/schedule.entity";
import Schedule from '../model/scheduleSchema'


export const updateScheduleStatus = async (id: string, status: string): Promise<ISchedule | null> => {
    try {
        if (!id || !status) {
            return null
        }
       

        const editedStatus = await Schedule.updateOne({ _id: id }, { $set: { status: status } });
       
        if (editedStatus.modifiedCount === 0) {
            return null
        }

        return await Schedule.findOne({_id:id})

    } catch (error) {
        console.error('error occured in editing job', error)
        throw new Error('Failed to edit job')
    }
}
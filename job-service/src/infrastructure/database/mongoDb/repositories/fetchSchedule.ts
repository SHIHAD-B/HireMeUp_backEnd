import { ISchedule } from "../../../../domain/entities/schedule.entity";
import Schedule from "../model/scheduleSchema";

export const fetchSchedule = async (id: string): Promise<ISchedule[] | null> => {
    try {
    
        const company = await Schedule.find({ companyId: id })
        const user = await Schedule.find({userId:id})
        if (!company && !user) {
            return null
        }

       if(user.length){
        return user
       }else if(company.length){
        return company
       }else{
        return null
       }
        
    } catch (error: any) {
        console.error('error occured in fetching the schedule', error)
        throw new Error('Failed to fetch the schedule...')
    }
}
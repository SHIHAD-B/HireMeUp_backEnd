import { sendScheduleMail } from "../../utils/mails/sendScheduleMail";
import Schedule from "../database/mongoDb/model/scheduleSchema";
import RabbitMQClient from "../rabbitmq/client";

export const reminderMailer = async () => {
    try {
        const check = await Schedule.find();
        
        const now = new Date();
        const thirtyMinutesLater = new Date(now.getTime() + 30 * 60000); 
        
        for (const item of check) {
            const itemDate = new Date(String(item?.date)); 
            if (itemDate > now && itemDate <= thirtyMinutesLater) {
                const client = await RabbitMQClient.getInstance();
                const data = {
                    id: item.userId
                };
                const result: any = await client.produce(data, "fetchUser", "toUser");
                await sendScheduleMail(result.email, itemDate.toISOString());
            }
        }
    } catch (error) {
        console.error("Error in reminderMailer:", error);
    }
};

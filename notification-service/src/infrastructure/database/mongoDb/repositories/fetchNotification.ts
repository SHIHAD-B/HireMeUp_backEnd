
import { INotification } from "../../../../domain/entities";
import Notification from "../model/notificationSchema";



export const fetchNotification = async (id: string): Promise<INotification[] | null> => {
    try {
        if (!id) {
            return null
        }
        
        const notification = Notification.find({ recipient: id })
        if (!notification) {
            return null
        }
        return notification

    } catch (error: any) {
        console.error('Error fetching notification', error);
        throw new Error('Failed to fetch notification.');
    }
};

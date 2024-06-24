
import Notification from "../model/notificationSchema";



export const updateReadStatus = async (id: string): Promise<boolean | null> => {
    try {
        if (!id) {
            return null
        }

        const updateNotification = await Notification.updateMany(
            { recipient: id },
            { $set: { read: true } }
        );

        if (updateNotification?.modifiedCount === 0) {
            return null;
        }

        return true;

    } catch (error: any) {
        console.error('Error fetching notification', error);
        throw new Error('Failed to fetch notification.');
    }
};

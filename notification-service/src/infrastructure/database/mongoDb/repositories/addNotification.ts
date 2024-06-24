
import {  INotification } from "../../../../domain/entities";
import Notification from "../model/notificationSchema";



export const addNotification = async (data: INotification): Promise<INotification | null > => {
    try {
        if (!data) {
            return null
        } 
        const addNoti= await Notification.create(data)

        return addNoti ? addNoti : null

    } catch (error: any) {
        console.error('Error adding skill', error);
        throw new Error('Failed to add skill.');
    }
};

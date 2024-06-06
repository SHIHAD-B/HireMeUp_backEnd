import { IChat, IGetRoom } from "../../../../domain/entities";
import Chat from "../model/chatSchema";


export const getRoom = async (id: string): Promise<IChat[] | null | boolean> => {
    try {
        if (!id) {
            return null
        }
        const fetchRoom = await Chat.find({ participants: { $in: [id] } })
        if (!fetchRoom) return false

        return fetchRoom

    } catch (error: any) {
        console.error('Error getting room:', error);
        throw new Error('Failed to get room.');
    }
}
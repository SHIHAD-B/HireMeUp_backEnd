import { IMessage } from "../../../../domain/entities";
import Chat from "../model/chatSchema";
import Message from "../model/messageSchema";

export const sendMessage = async (data: IMessage): Promise<IMessage | null | boolean> => {
    try {
        if (!data || !data.sender || !data.receiver || !data.content || !data.type) {
            return null;
        }

        const messageData = {
            sender: data.sender,
            receiver: data.receiver,
            content: data.content,
            type: data.type,
            status: "delivered"
        };

        const newMessage = await Message.create(messageData);
        if (!newMessage) return false;

        let chat = await Chat.findOne({ participants: { $all: [data.sender, data.receiver] } });

        if (!chat) {
            chat = await Chat.create({
                message: [newMessage._id],
                participants: [data.sender, data.receiver]
            });
            if (!chat) {
                return null;
            }
        } else {
            const updateChat = await Chat.updateOne(
                { _id: chat._id },
                { $push: { message: newMessage._id } }
            );
            if (updateChat.modifiedCount == 0) return false;
        }
         
        return newMessage;
    } catch (error: any) {
        console.error('Error adding message:', error);
        throw new Error('Failed to add message.');
    }
};

import { IMessage } from "../entities";
import { IChat } from "../entities/chat.entity";


export interface IRepositories {
    addRoom: (data: any) => Promise<IChat | null | boolean>
    getMessages: (id: string) => Promise<IChat | null | boolean>
    getRoom: (id: string) => Promise<IChat[] | null | boolean>
    sendMessage: (data: IMessage) => Promise<IMessage | null | boolean>
    listAllMessage: (id: string) => Promise<IChat[] | null | boolean>
    updateReadStatus: (sender: string, receiver: string, status: string) => Promise<IMessage[] | null | boolean>
}
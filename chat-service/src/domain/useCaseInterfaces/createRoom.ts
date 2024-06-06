import { IChat, IMessage } from "../entities"

export interface IcreateRoomUseCase {
    execute(data: IMessage): Promise<IChat | null | boolean>
}


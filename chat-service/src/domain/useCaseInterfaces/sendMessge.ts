import { IMessage } from "../entities"

export interface ISendMessageUseCase {
    execute(data: IMessage): Promise<IMessage | null | boolean>
}


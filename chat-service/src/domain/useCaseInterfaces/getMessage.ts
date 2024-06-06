import { IChat } from "../entities"

export interface IGetMessageUseCase {
    execute(id: string): Promise<IChat | null | boolean>
}


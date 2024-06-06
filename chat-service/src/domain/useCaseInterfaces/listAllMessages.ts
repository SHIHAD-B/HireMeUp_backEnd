import { IChat } from "../entities"

export interface IListAllMessageUseCase {
    execute(id: string): Promise<IChat[] | null | boolean>
}


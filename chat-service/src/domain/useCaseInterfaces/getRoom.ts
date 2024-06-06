import { IChat } from "../entities"

export interface IGetRoomUseCase {
    execute(id:string): Promise<IChat[] | null | boolean>
}


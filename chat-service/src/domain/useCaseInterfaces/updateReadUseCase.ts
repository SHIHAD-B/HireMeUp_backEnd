import {  IMessage } from "../entities"

export interface IUpdateReadUseCase {
    execute(sender: string, receiver: string, status: string): Promise<IMessage[] | null | boolean>
}


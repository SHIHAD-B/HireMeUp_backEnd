import { IMessage } from "../../domain/entities/message.entity"
import { IDependencies } from "../../domain/interfaces/dependencies"

export const createRoomUseCase = (dependencies: IDependencies) => {
    const { repositories: { addRoom } } = dependencies
    return {
        execute: async (data: IMessage) => {
            try {
                return await addRoom(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
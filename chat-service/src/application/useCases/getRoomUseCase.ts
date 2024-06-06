
import { IDependencies } from "../../domain/interfaces/dependencies"

export const getRoomUseCase = (dependencies: IDependencies) => {
    const { repositories: { getRoom } } = dependencies
    return {
        execute: async (data:any) => {
            try {
                return await getRoom(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
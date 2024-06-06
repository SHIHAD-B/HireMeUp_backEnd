
import { IDependencies } from "../../domain/interfaces/dependencies"

export const listAllMessageUseCase = (dependencies: IDependencies) => {
    const { repositories: { listAllMessage } } = dependencies
    return {
        execute: async (id:string) => {
            try {
                return await listAllMessage(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
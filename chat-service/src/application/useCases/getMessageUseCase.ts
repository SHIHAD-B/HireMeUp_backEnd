
import { IDependencies } from "../../domain/interfaces/dependencies"

export const getMessageUseCase = (dependencies: IDependencies) => {
    const { repositories: { getMessages } } = dependencies
    return {
        execute: async (id:string) => {
            try {
                return await getMessages(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
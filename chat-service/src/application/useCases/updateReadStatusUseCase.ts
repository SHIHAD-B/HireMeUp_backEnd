
import { IDependencies } from "../../domain/interfaces/dependencies"

export const updateReadUseCase = (dependencies: IDependencies) => {
    const { repositories: { updateReadStatus } } = dependencies
    return {
        execute: async (sender: string, receiver: string, status: string) => {
            try {
                return await updateReadStatus(sender, receiver, status)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
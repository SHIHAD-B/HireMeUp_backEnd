import { INotification } from "../../domain/entities"
import { IDependencies } from "../../domain/interfaces/dependencies"



export const addNotificationUseCase = (dependencies: IDependencies) => {
    const { repositories: { addNotification } } = dependencies
    return {
        execute: async (data:INotification) => {
            try {
                return await addNotification(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
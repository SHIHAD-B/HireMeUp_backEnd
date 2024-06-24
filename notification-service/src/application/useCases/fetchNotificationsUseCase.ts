import { IDependencies } from "../../domain/interfaces/dependencies"



export const fetchNotificationUseCase = (dependencies: IDependencies) => {
    const { repositories: { fetchNotification } } = dependencies
    return {
        execute: async (id:string) => {
            try {
                return await fetchNotification(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
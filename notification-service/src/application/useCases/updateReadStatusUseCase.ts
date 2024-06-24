import { IDependencies } from "../../domain/interfaces/dependencies"



export const updateReadStatusUseCase = (dependencies: IDependencies) => {
    const { repositories: { updateReadStatus } } = dependencies
    return {
        execute: async (id:string) => {
            try {
                return await updateReadStatus(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
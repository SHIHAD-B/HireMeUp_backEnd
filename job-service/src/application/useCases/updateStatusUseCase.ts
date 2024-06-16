import { IDependencies } from "../../domain/interface";

export const updateStatusUseCase = (dependencies: IDependencies) => {
    const { repositories: { updateStatus } } = dependencies

    return {
        execute: async (id: string, status: string) => {
            try {
                return await updateStatus(id,status)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
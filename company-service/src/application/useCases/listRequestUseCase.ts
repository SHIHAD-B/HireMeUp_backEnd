import { IDependencies } from "../../domain/interfaces";

export const listRequestUseCase = (dependencies: IDependencies) => {
    const { repositories: { listRequest } } = dependencies

    return {
        execute: async () => {
            try {
                return await listRequest()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
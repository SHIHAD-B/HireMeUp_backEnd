import { IDependencies } from "../../domain/interfaces";

export const fetchUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { fetchUser } } = dependencies

    return {
        execute: async (id: string) => {
            try {
                return await fetchUser(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
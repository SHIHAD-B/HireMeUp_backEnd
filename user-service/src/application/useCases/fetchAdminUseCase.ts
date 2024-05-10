import { IDependencies } from "../../domain/interfaces";

export const fetchAdminUseCase = (dependencies: IDependencies) => {
    const { repositories: { fetchAdmin } } = dependencies

    return {
        execute: async (id: string) => {
            try {
                return await fetchAdmin(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
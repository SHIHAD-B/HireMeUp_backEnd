
import { IDependencies } from "../../domain/interfaces";


export const listAdminUseCase = (dependencies: IDependencies) => {
    const { repositories: { listAdmin } } = dependencies
    return {
        execute: async () => {
            try {
                return await listAdmin()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
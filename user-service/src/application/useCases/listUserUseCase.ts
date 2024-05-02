import { IDependencies } from "../../domain/interfaces";


export const listUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { listUser } } = dependencies
    return {
        execute: async () => {
            try {
                return await listUser()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
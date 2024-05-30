import { IDependencies } from "../../domain/interfaces";

export const listEmployeeUseCase = (dependencies: IDependencies) => {
    const { repositories: { listEmployee } } = dependencies

    return {
        execute: async () => {
            try {
                return await listEmployee()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
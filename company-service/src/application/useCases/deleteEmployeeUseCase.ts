import { IDependencies } from "../../domain/interfaces";

export const deleteEmployeeUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteEmployee } } = dependencies

    return {
        execute: async (id: string) => {
            try {
                return await deleteEmployee(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
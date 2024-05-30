import { IDependencies } from "../../domain/interfaces";

export const deleteEmployeeUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteEmployee } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await deleteEmployee(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
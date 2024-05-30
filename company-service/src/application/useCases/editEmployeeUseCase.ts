import { IEmployee } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const editEmployeeUseCase = (dependencies: IDependencies) => {
    const { repositories: { editEmployee } } = dependencies

    return {
        execute: async (data: IEmployee) => {
            try {
                return await editEmployee(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
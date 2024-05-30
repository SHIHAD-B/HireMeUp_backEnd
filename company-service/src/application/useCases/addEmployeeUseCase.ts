import { IEmployee } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const addEmployeeUseCase = (dependencies: IDependencies) => {
    const { repositories: { addEmployee } } = dependencies
    return {
        execute: async (data: IEmployee) => {
            try {
                return await addEmployee(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
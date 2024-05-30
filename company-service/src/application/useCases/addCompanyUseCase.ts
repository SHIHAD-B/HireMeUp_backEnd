import { ICompany } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const addCompanyUseCase = (dependencies: IDependencies) => {
    const { repositories: { addCompany } } = dependencies
    return {
        execute: async (data: ICompany) => {
            try {
                return await addCompany(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
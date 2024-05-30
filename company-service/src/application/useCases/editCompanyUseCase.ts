import { ICompany } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const editCompanyUseCase = (dependencies: IDependencies) => {
    const { repositories: { editCompany } } = dependencies

    return {
        execute: async (data: ICompany) => {
            try {
                return await editCompany(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
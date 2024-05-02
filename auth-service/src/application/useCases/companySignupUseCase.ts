import { ICompany } from "../../domain/entities/company.entity";
import { IDependencies } from "../../domain/interfaces";

export const companySignupUseCase = (dependencies: IDependencies) => {
    const { repositories: { companySignup } } = dependencies

    return {
        execute: async (data: ICompany) => {
            try {
                return await companySignup(data) as ICompany
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
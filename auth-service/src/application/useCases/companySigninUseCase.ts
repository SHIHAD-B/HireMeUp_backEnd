import { ICompanySignin } from "../../domain/entities/companySignin.enitity";
import { IDependencies } from "../../domain/interfaces";

export const companySigninUseCase = (dependencies: IDependencies) => {
    const { repositories: { companySignin } } = dependencies

    return {
        execute: async (data: ICompanySignin) => {
            try {
                return await companySignin(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
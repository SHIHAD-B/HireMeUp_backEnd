import { ICompany } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const rejectRequestUseCase = (dependencies: IDependencies) => {
    const { repositories: { rejectRequest } } = dependencies

    return {
        execute: async (data: ICompany) => {
            try {
                return await rejectRequest(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}

import { ICompany } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const approveRequestUseCase = (dependencies: IDependencies) => {
    const { repositories: { approveRequest } } = dependencies
    return {
        execute: async (data: ICompany) => {
            try {
                return await approveRequest(data)
            } catch (error:any) {
                throw new Error(error)
            }
        }
    }
}

import { IRequests } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const addRequestUseCase = (dependencies: IDependencies) => {
    const { repositories: { addRequest } } = dependencies
    return {
        execute: async (data: IRequests) => {
            try {
                return await addRequest(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
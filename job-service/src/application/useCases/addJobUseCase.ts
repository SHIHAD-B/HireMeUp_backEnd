import { IJobs } from "../../domain/entities";
import { IDependencies } from "../../domain/interface";

export const addJobUseCase = (dependencies: IDependencies) => {
    const { repositories: { addJob } } = dependencies

    return {
        execute: async (data: IJobs) => {
            try {
                return await addJob(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
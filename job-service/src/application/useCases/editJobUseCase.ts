import { IJobs } from "../../domain/entities";
import { IDependencies } from "../../domain/interface";

export const editJobUseCase = (dependencies: IDependencies) => {
    const { repositories: { editJob } } = dependencies

    return {
        execute: async (data: IJobs) => {
            try {
                return await editJob(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
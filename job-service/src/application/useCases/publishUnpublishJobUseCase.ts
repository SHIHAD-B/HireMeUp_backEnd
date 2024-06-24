import { IDependencies } from "../../domain/interface";

export const publishUnpublishJobUseCase = (dependencies: IDependencies) => {
    const { repositories: { publishUnpublishJob } } = dependencies

    return {
        execute: async (id: string) => {
            try {
                return await publishUnpublishJob(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
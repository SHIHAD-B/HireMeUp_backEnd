import { IDependencies } from "../../domain/interface";

export const listApplicantsUseCase = (dependencies: IDependencies) => {
    const { repositories: { listApplicants } } = dependencies

    return {
        execute: async () => {
            try {
                return await listApplicants()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
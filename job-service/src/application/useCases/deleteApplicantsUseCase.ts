import { IDependencies } from "../../domain/interface";

export const deleteApplicantsUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteApplicant } } = dependencies

    return {
        execute: async (id: string) => {
            try {
                return await deleteApplicant(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
import { IDependencies } from "../../domain/interfaces";


export const addResumeUseCase = (dependencies: IDependencies) => {
    const { repositories: { addResume } } = dependencies
    return {
        execute: async (id: string, resume: string) => {
            try {
                return await addResume(id,resume)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
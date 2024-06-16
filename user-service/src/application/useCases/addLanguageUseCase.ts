import { IDependencies } from "../../domain/interfaces";


export const addLanguageUseCase = (dependencies: IDependencies) => {
    const { repositories: { addLanguage } } = dependencies
    return {
        execute: async (id: string, language: string) => {
            try {
                return await addLanguage(id,language)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
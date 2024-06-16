import { IDependencies } from "../../domain/interfaces";


export const deleteLanguageUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteLanguage } } = dependencies
    return {
        execute: async (id: string, lang: string) => {
            try {
                return await deleteLanguage(id, lang)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
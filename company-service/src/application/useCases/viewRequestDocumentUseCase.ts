import { IDependencies } from "../../domain/interfaces";

export const viewRequestDocumentUseCase = (dependencies: IDependencies) => {
    const { repositories: { viewRequestDocument } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await viewRequestDocument(id)
            } catch (error:any) {
                throw new Error(error)
            }
        }
    }
}
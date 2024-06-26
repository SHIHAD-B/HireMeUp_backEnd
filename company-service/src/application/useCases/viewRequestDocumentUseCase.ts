import { IDependencies } from "../../domain/interfaces";

export const viewRequestDocumentUseCase = (dependencies: IDependencies) => {
    const { repositories: { viewRequestDocument } } = dependencies
    return {
        execute: async (id: string,document:string) => {
            try {
                return await viewRequestDocument(id,document)
            } catch (error:any) {
                throw new Error(error)
            }
        }
    }
}
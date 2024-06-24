import {IContact } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const addContactLinksUseCase = (dependencies: IDependencies) => {
    const { repositories: { addContactLinks } } = dependencies
    return {
        execute: async (data: IContact) => {
            try {
                return await addContactLinks(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
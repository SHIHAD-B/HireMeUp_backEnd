import { ISocialLink } from "../../domain/entities/socialLink.entity";
import { IDependencies } from "../../domain/interfaces";


export const editSocialLinkUseCase = (dependencies: IDependencies) => {
    const { repositories: {editSocialLink} } = dependencies
    return {
        execute: async (id: string, data:ISocialLink) => {
            try {
                return await editSocialLink(id, data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
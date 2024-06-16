import { IDependencies } from "../../domain/interfaces";


export const deleteSkillUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteSkill } } = dependencies
    return {
        execute: async (id: string, skill: string) => {
            try {
                return await deleteSkill(id, skill)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
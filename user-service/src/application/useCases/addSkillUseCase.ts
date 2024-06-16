import { IDependencies } from "../../domain/interfaces";


export const addSkillUseCase = (dependencies: IDependencies) => {
    const { repositories: { addSkill } } = dependencies
    return {
        execute: async (id: string, skill: string) => {
            try {
                return await addSkill(id, skill)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
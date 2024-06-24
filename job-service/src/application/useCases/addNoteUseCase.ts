
import { IDependencies } from "../../domain/interface";

export const addNoteUseCase = (dependencies: IDependencies) => {
    const { repositories: { addNotes } } = dependencies

    return {
        execute: async (data: IAddNote) => {
            try {
                return await addNotes(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
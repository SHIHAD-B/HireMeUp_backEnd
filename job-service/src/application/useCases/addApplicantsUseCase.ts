import { IApplicants } from "../../domain/entities";
import { IDependencies } from "../../domain/interface";


export const addApplicantsUseCase = (dependencies: IDependencies) => {
    const { repositories: { addApplicants } } = dependencies

    return {
        execute: async (data: IApplicants) => {
            try {
                return await addApplicants(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
import { IAddress } from "../../domain/entities/address.entity";
import { IDependencies } from "../../domain/interfaces";


export const addAddressUseCase = (dependencies: IDependencies) => {
    const { repositories: { addAddress } } = dependencies
    return {
        execute: async (id: string, data:IAddress) => {
            try {
                return await addAddress(id, data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
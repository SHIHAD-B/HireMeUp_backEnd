import { IAdmin } from "../entities"

export interface IFetchAdminUseCase {
    execute(id: string): Promise<IAdmin | null>
}
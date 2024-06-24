import { IAdmin } from "../entities";


export interface IListAdminUseCase {
    execute(): Promise<IAdmin[] | null>
}
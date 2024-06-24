import { IAdmin } from "../entities";


export interface IAddAdminUseCase {
    execute(data:IAdmin): Promise<IAdmin | null | boolean>
}
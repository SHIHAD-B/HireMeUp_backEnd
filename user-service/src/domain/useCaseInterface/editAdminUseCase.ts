import { IAdmin } from "../entities";


export interface IEditAdminUseCase {
    execute(data: IAdmin): Promise<IAdmin | null>
}
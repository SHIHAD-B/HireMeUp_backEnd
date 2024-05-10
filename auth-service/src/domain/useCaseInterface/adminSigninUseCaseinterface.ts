import { IAdminEntity } from "../entities";

export interface IAdminSigninUseCase {
    execute(user: IAdminEntity): Promise<IAdminEntity | boolean | null>
}
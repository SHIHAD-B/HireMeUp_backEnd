import { IUserEntity } from "../entities";

export interface ISigninUserUseCase {
    execute(user: IUserEntity): Promise<IUserEntity | boolean | null>
}
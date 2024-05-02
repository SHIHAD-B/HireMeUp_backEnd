import { IUserEntity } from '../entities'

export interface ISignupUserUseCase {
    execute(user: IUserEntity): Promise<IUserEntity | null>
}
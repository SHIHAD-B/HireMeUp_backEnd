import { IUserExist } from "../entities"
import { IUsersResult } from "../entities/user.result.entity"

export interface IEmailExistUserUseCase {
    execute(data:IUserExist): Promise<IUsersResult |boolean | null>
}
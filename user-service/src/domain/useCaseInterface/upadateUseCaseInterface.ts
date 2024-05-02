import { IUsers } from "../entities/user.entity";

export interface IUpdateUserUseCase {
    execute(data: IUsers): Promise<IUsers | null>
}
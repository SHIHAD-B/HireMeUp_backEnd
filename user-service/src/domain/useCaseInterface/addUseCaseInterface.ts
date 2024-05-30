
import { IUsers } from "../entities/user.entity";

export interface IAddUserUseCase {
    execute(data: IUsers): Promise<IUsers | null |boolean>
}
import { IUsers } from "../entities/user.entity";

export interface IListUseCase {
    execute(): Promise<IUsers[] | null>
}
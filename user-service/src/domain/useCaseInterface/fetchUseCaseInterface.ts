import { IUsers } from "../entities/user.entity";

export interface IFetchUseCase {
    execute(id: string): Promise<IUsers | null>
}
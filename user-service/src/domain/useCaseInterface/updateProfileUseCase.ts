import { IUsers } from "../entities/user.entity";

export interface IUpdateProfileUseCase {
    execute(id:string,data:string,field:string): Promise<IUsers | null>
}
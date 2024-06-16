import { IUsers } from "../entities/user.entity";

export interface IDeleteEducationUseCase {
    execute(userId:string,id:string): Promise<IUsers | null>
}

import { IUsers } from "../entities/user.entity";

export interface IDeleteExperienceUseCase {
    execute(userId:string,id:string): Promise<IUsers | null>
}
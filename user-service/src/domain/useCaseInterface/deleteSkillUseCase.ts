
import { IUsers } from "../entities/user.entity";

export interface IDeleteSkillCase {
    execute(id:string,skill:string): Promise<IUsers | null>
}
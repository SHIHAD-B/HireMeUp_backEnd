
import { IUsers } from "../entities/user.entity";

export interface IAddSkillCase {
    execute(id:string,skill:string): Promise<IUsers | null>
}
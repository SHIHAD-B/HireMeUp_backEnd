
import { IUsers } from "../entities/user.entity";

export interface IAddLanguageCase {
    execute(id:string,lang:string): Promise<IUsers | null>
}
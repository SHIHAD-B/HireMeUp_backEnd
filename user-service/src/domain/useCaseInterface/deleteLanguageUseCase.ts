
import { IUsers } from "../entities/user.entity";

export interface IDeleteLanguageCase {
    execute(id:string,lang:string): Promise<IUsers | null>
}
import { IEmployee } from "../entities";

export interface IAddEmployee{
    execute(data:IEmployee):Promise<IEmployee | null | boolean>
}
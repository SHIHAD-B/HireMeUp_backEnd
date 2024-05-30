import { ICompany } from "../entities";

export interface IAddCompany{
    execute(data:ICompany):Promise<ICompany | null | boolean>
}
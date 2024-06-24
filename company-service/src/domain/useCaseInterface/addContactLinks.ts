

import { ICompany, IContact } from "../entities";

export interface IAddContactLinks {
    execute(data: IContact): Promise<ICompany | null | boolean>
}
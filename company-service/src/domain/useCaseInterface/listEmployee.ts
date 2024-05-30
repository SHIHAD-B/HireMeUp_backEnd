import {IEmployee } from "../entities"

export interface IListEmployee{
    execute(): Promise<IEmployee[] | null>
}
import { IRequests } from "../entities"

export interface IListRequests{
    execute(): Promise<IRequests[] | null>
}
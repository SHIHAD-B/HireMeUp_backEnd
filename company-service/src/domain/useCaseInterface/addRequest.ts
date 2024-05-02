import { IRequests } from "../entities";

export interface IAddRequest{
    execute(data:IRequests):Promise<IRequests | null | false>
}
import { IJobs } from "../entities";

export interface IFetchJobJobUseCase {
    execute(id:string): Promise<IJobs[] | null>
}
import { IJobs } from "../entities";

export interface IListJobUseCase {
    execute(): Promise<IJobs[] | null>
}
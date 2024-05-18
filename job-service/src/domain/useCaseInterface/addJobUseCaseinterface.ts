import { IJobs } from "../entities";

export interface IAddJobUseCase {
    execute(data: IJobs): Promise<IJobs | null>
}
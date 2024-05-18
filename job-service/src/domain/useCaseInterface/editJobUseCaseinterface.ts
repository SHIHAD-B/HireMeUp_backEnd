import { IJobs } from "../entities";

export interface IEditJob {
    execute(data: IJobs): Promise<IJobs | null>
}
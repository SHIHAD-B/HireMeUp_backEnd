import { IJobs } from "../entities";

export interface IPublishUnpublishUseCase {
    execute(id: string): Promise<IJobs | null>
}
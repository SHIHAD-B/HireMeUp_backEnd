import { INotification } from "../entities";

export interface IFetchNotificationUseCase {
    execute(id: string): Promise<INotification[] | null>
}
import { INotification } from "../entities";

export interface IAddNotificationUseCase {
    execute(data: INotification): Promise<INotification | null>
}
import {IEmployee } from "../entities";

export interface IEditEmployeeUseCase {
    execute(data: IEmployee): Promise<IEmployee | null | boolean>
}
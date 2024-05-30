import { ICategory } from "../entities";

export interface IEditCategoryUseCase {
    execute(data: ICategory): Promise<ICategory | null | boolean>
}
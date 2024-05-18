import { ICategory } from "../entities";

export interface IListCategoryUseCase {
    execute(): Promise<ICategory[] | null>
}
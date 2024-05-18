import { ICategory } from "../entities";


export interface IAddCategoryUseCase {
    execute(data: ICategory): Promise<ICategory | null>
}
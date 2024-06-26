import { IRepositories } from "./repositories";
import { IUseCase } from "./useCase";

export interface IDependencies {
    repositories: IRepositories,
    useCases: IUseCase
}
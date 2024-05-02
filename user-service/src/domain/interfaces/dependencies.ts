import { IRepositories } from "./repositories";
import { IUseCases } from "./useCase";

export interface IDependencies {
    repositories: IRepositories;
    useCases: IUseCases;
}

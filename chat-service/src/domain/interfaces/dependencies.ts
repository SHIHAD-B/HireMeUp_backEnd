import { IRepositories } from "./repositories";
import { IUseCases } from "./useCases";


export interface IDependencies {
    repositories: IRepositories;
    useCases:IUseCases
   
}

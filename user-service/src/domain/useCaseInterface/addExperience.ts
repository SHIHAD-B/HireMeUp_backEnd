import { IExperience } from "../entities/experience.entity";
import { IUsers } from "../entities/user.entity";

export interface IAddExperienceUseCase {
    execute(id:string,data:IExperience): Promise<IUsers | null>
}
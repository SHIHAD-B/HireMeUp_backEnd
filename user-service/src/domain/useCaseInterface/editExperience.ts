import { IExperience } from "../entities/experience.entity";
import { IUsers } from "../entities/user.entity";

export interface IEditExperienceUseCase {
    execute(id:string,data:IExperience): Promise<IUsers | null>
}
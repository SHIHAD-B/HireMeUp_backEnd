import { IEducation } from "../entities/education.entities";
import { IExperience } from "../entities/experience.entity";
import { IUsers } from "../entities/user.entity";

export interface IEditEducationUseCase {
    execute(id:string,data:IEducation): Promise<IUsers | null>
}
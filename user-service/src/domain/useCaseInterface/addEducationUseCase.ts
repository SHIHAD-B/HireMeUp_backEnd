import { IEducation } from "../entities/education.entities";
import { IUsers } from "../entities/user.entity";

export interface IAddEducationUseCase {
    execute(id:string,data:IEducation): Promise<IUsers | null>
}
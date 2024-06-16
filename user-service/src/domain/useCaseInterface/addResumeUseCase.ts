
import { IUsers } from "../entities/user.entity";

export interface IAddResumeUseCase {
    execute(id:string,resume:string): Promise<IUsers | null>
}
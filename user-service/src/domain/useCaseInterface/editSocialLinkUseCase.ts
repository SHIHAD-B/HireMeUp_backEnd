import { ISocialLink } from "../entities/socialLink.entity";
import { IUsers } from "../entities/user.entity";

export interface ISoclailLinkUseCase {
    execute(id:string,data:ISocialLink): Promise<IUsers | null>
}
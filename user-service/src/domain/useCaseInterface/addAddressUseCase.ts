import { IAddress } from "../entities/address.entity";
import { IUsers } from "../entities/user.entity";

export interface IAddAddressUseCase {
    execute(id:string,data:IAddress): Promise<IUsers | null>
}
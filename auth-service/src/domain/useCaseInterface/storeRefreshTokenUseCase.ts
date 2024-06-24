import { IRefreshToken } from "../entities";

export interface IStoreRefreshTokenUseCase {
    execute(data: IRefreshToken): Promise<IRefreshToken | null | boolean>
}
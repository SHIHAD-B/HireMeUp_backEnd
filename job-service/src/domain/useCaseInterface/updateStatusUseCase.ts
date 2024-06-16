import { IApplicants } from "../entities";


export interface IUpdateStatusUseCase {
    execute(id: string, status: string): Promise<IApplicants[] | null>
}
import { IApplicants } from "../entities";

export interface IAddApplicantsUseCase {
    execute(data: IApplicants): Promise<IApplicants | null>
}
import { IApplicants } from "../entities";

export interface IAddNoteUseCase {
    execute(data: IAddNote): Promise<IApplicants | null>
}
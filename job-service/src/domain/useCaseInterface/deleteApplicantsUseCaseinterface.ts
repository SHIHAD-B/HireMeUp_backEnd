export interface IDeleteApplicantUseCase {
    execute(id: string): Promise<boolean | null>
}
export interface IDeleteCompanyUseCase {
    execute(email: string): Promise<boolean | null>
}
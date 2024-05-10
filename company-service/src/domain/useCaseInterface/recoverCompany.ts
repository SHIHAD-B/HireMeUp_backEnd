export interface IRecoverCompanyUseCase {
    execute(email: string): Promise<boolean | null>
}
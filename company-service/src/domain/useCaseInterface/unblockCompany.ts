export interface IUnBlockCompanyUseCase {
    execute(email: string): Promise<boolean | null>
}
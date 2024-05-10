export interface IBlockCompanyUseCase {
    execute(email: string): Promise<boolean | null>
}
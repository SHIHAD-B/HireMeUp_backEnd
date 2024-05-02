export interface ICompanyEmailExistUseCase {
    execute(email: String): Promise<boolean | null>
}
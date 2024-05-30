export interface IDeleteEmployeeUseCase {
    execute(email: string): Promise<boolean | null>
}
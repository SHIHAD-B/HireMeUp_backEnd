export interface IDeleteEmployeeUseCase {
    execute(id: string): Promise<boolean | null>
}
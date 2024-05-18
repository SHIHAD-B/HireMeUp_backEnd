export interface IDeleteJobUseCase {
    execute(id: string): Promise<boolean | null>
}
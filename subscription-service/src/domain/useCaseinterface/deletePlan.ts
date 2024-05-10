
export interface IDeleteUseCase {
    execute(id:string): Promise<boolean | null>
}
export interface IResetUseCase {
    execute(email: string,password:string): Promise<boolean | null>
}
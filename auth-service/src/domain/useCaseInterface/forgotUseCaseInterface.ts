export interface IForgotUseCase {
    execute(email:string): Promise<boolean | null>
}


export interface IEmailExistUserUseCase {
    execute(email: String): Promise<boolean | null>
}

export interface IVerfiyOtpUseCase {
    execute(email: String, otp: String): Promise<boolean | null>
}

export interface IBlockUseCase {
    execute(email: string): Promise<boolean | null>
}
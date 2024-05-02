
export interface IBlockUseCase {
    execute(id: string): Promise<boolean | null>
}
export interface IRecoverUseCase {
    execute(id: string): Promise<boolean | null>
}
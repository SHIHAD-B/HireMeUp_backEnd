export interface IUnBlockUseCase {
    execute(id: string): Promise<boolean | null>
}
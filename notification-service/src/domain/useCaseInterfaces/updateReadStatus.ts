

export interface IUpdateReadStatusUseCase {
    execute(id: string): Promise<boolean | null>
}
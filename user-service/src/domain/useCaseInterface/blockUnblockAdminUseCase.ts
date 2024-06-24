
export interface IBlockUnBlockAdminUseCase {
    execute(email: string): Promise<boolean | null>
}
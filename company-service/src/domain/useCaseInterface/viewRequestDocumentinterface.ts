
export interface IViewRequestDocument {
    execute(id: string): Promise<boolean | null>
}
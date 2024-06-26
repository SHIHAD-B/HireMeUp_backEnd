
export interface IViewRequestDocument {
    execute(id: string,document:string): Promise<boolean | null>
}
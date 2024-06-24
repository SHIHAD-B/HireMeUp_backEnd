import { INotification } from "../entities";


export interface IRepositories {
    addNotification: (data: INotification) => Promise<INotification | null>
    fetchNotification :(id: string)=> Promise<INotification[] | null>
    updateReadStatus : (id: string)=> Promise<boolean | null> 
}
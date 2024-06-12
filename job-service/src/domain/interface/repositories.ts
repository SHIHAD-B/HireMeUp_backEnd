import { IJobs } from "../entities"
import { ICategory } from "../entities"
import { IApplicants } from "../entities"

export interface IRepositories {
    listJobs: () => Promise<IJobs[] | null>
    listCategory: () => Promise<ICategory[] | null>
    listApplicants: () => Promise<IApplicants[] | null>
    editJob: (data: IJobs) => Promise<IJobs | null>
    editCategory: (data: ICategory) => Promise<ICategory | null | boolean>
    deleteJob: (id: string) => Promise<boolean | null>
    deleteCategory: (id: string) => Promise<boolean | null>
    deleteApplicant: (id: string) => Promise<boolean | null>
    addJob: (data: IJobs) => Promise<IJobs | null>
    addCategory: (data: ICategory) => Promise<ICategory | null>
    addApplicants: (data: IApplicants) => Promise<IApplicants | null>
    fetchJobs: (id: string) => Promise<IJobs[] | null>
    fetchApplicants: (id: string) => Promise<IApplicants[] | null>

}
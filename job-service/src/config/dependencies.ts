import * as repositories from '../infrastructure/database/mongoDb/repositories'
import { useCases } from '../application'
import { IDependencies } from '../domain/interface'

export const dependencies: IDependencies = {
    repositories,
    useCases
}
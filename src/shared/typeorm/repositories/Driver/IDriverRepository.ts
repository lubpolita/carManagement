import { Driver } from '../../entities/Driver'
import { ICreateDriverDTO } from '../../../../dtos/CreateDriverDTO'

export interface IDriverRepository {
    findById: (id: string) => Promise<Driver | undefined>
    create: (data: ICreateDriverDTO) => Promise<Driver>
    update: (data: Driver) => Promise<Driver>
    delete(id: string): Promise<void>
    findAll: () => Promise<Driver[] | undefined>
}
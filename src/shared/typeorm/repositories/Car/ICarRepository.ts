import { Car } from '../../entities/Car'
import { ICreateCarDTO } from '../../../../dtos/CreateCarDTO'

export interface ICarsRepository {
    findById: (id: string) => Promise<Car | undefined>
    create: (data: ICreateCarDTO) => Promise<Car>
    update: (data: Car) => Promise<Car>
    delete(id: string): Promise<void>
    findAll: () => Promise<Car[] | undefined>
}
import { Repository } from 'typeorm'
import { ICreateCarUseDTO } from '../../../../dtos/CreateCarUseDTO'
import { dataSource } from '../../../typeorm'
import { CarUse } from '../../entities/CarUse'
import { ICarUseRepository } from './ICarUseRepository'

export default class CarUseRepository implements ICarUseRepository {
    private readonly ormRepository: Repository<CarUse>
    constructor() {
        this.ormRepository = dataSource.getRepository(CarUse)
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id)
    }

    public async create(data: ICreateCarUseDTO): Promise<CarUse> { 
        const carUse = this.ormRepository.create(data)
        await this.ormRepository.save(carUse)
        return carUse
    }

    public async findById(id: string): Promise<CarUse | undefined> {
        const carUse = await this.ormRepository.findOne({ where: { id } })
        return carUse as CarUse| undefined;
    }

    public async findCarById(id: string): Promise<CarUse[] | undefined> {
        const carUse = await this.ormRepository.find({ where: { carId: id } })
        return carUse;
    }

    public async findDriverById(id: string): Promise<CarUse[] | undefined> {
        const carUse = await this.ormRepository.find({ where: { driverId: id } })
        return carUse;
    }

    public async findAll(): Promise<CarUse[] | undefined> {
        const carUse = await this.ormRepository.find()
        return carUse
    }

    public async update(data: CarUse): Promise<CarUse> {
        const carUse = await this.ormRepository.save(data)
        return carUse
    }

}
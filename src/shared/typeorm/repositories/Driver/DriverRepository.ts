import { Repository } from 'typeorm'
import { dataSource } from '@shared/typeorm'
import { Driver } from '../../entities/Driver'
import { ICreateDriverDTO } from '../../../../dtos/CreateDriverDTO'
import { IDriverRepository } from './IDriverRepository'

export default class DriverRepository implements IDriverRepository {
    private readonly ormRepository: Repository<Driver>
    constructor() {
        this.ormRepository = dataSource.getRepository(Driver)
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id)
    }

    public async create(data: ICreateDriverDTO): Promise<Driver> {
        const driver = this.ormRepository.create(data)
        await this.ormRepository.save(driver)
        return driver
    }

    public async findById(id: string): Promise<Driver | undefined> {
        const driver = await this.ormRepository.findOne({ where: { id } })
        return driver
    }


    public async findAll(): Promise<Driver[] | undefined> {
        const driver= await this.ormRepository.find()
        return driver
    }

    public async update(data: Driver): Promise<Driver> {
        const driver= await this.ormRepository.save(data)
        return driver
    }

}
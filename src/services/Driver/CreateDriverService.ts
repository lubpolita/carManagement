import { inject, injectable } from 'tsyringe'
import { Driver } from '../../shared/typeorm/entities/Driver'
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository'
import { ICreateDriverDTO } from '../../dtos/CreateDriverDTO'

@injectable()
export default class CreateDriverService {
  constructor (
    @inject('DriverRepository')
    private readonly driverRepository: IDriverRepository
  ) {
  }

  public async execute (data: ICreateDriverDTO): Promise<Driver> {
    const car = await this.driverRepository.create(data)
    return car
  }
}
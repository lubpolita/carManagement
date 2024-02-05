import { inject, injectable } from 'tsyringe'
import { ICreateCarUseDTO } from '../../dtos/CreateCarUseDTO'
import { CarUse } from '../../shared/typeorm/entities/CarUse'
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository'
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository'
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository'

@injectable()
export default class CreateCarUseService {
  constructor (
    @inject('CarUseRepository')
    private readonly carUseRepository: ICarUseRepository,
    @inject('CarRepository')
    private readonly carRepository: ICarsRepository,
    @inject('DriverRepository')
    private readonly driverRepository: IDriverRepository,
  ) {
  }

  public async execute(data: ICreateCarUseDTO): Promise<CarUse> {
    
    const carExists = await this.carRepository.findById(data.carId)
    const driverExists = await this.driverRepository.findById(data.driverId)

    if (!carExists) {
      throw new Error('Car does not exists')
    }

    if (!driverExists) {
      throw new Error('Driver does not exists')
    }

    const carIsBusy = await this.carUseRepository.findCarById(data.carId)
    const driverIsBusy = await this.carUseRepository.findDriverById(data.driverId)

    for (const carUse of carIsBusy) {
      if (carUse && !carUse.finalDate) {
        throw new Error('Car is busy')
      }
    }

    for (const driver of driverIsBusy) {
      if (driver && !driver.finalDate) {
        throw new Error('Driver is busy')
      }
    }
    
    const carUse = await this.carUseRepository.create(data)
    return carUse
  }
}
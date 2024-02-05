import { inject, injectable } from 'tsyringe'
import { Car } from '../../shared/typeorm/entities/Car'
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository'
import { ICreateCarDTO } from '../../dtos/CreateCarDTO'

@injectable()
export default class CreateCarService {
  constructor (
    @inject('CarRepository')
    private readonly carRepository: ICarsRepository
  ) {
  }

  public async execute (data: ICreateCarDTO): Promise<Car> {
    const car = await this.carRepository.create(data)
    return car
  }
}
/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import { ICreateCarDTO } from '../../dtos/CreateCarDTO';
import { Car } from '../../shared/typeorm/entities/Car';
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository';

@injectable()
export default class CreateCarService {
  constructor(
    @inject('CarRepository')
    private readonly carRepository: ICarsRepository,
  ) {}

  public async execute(data: ICreateCarDTO): Promise<Car> {
    const car = await this.carRepository.create(data);
    return car;
  }
}

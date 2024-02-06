/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import { Car } from '../../shared/typeorm/entities/Car';
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('CarRepository')
    private readonly carRepository: ICarsRepository,
  ) {}

  public async execute(id: string): Promise<Car | undefined> {
    const car = await this.carRepository.findById(id);
    return car;
  }
}

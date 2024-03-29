/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import { Car } from '../../shared/typeorm/entities/Car';
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository';

@injectable()
export default class FindAllCarService {
  constructor(
    @inject('CarRepository')
    private readonly carRepository: ICarsRepository,
  ) {}

  public async execute(): Promise<Car[] | undefined> {
    const carArray = await this.carRepository.findAll();
    return carArray;
  }
}

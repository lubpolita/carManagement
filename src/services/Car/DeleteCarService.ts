import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository';
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository';

@injectable()
export default class DeleteCarService {
  constructor(
    @inject('CarRepository')
    private readonly carRepository: ICarsRepository,

    @inject('CarUseRepository')
    private readonly carUseRepository: ICarUseRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const carExists = await this.carRepository.findById(id);
    if (!carExists) {
      throw new Error('Invalid car id');
    }

    const carIsBusy = await this.carUseRepository.findCarById(id);
    for (const carUse of carIsBusy) {
      if (carUse && !carUse.finalDate) {
        throw new Error('You cannot delete a car that is in use.');
      }
    }

    await this.carRepository.delete(id);
  }
}

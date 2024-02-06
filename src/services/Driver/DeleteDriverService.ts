/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository';
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository';

@injectable()
export default class DeleteDriverService {
  constructor(
    @inject('DriverRepository')
    private readonly driverRepository: IDriverRepository,

    @inject('CarUseRepository')
    private readonly carUseRepository: ICarUseRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Please, insert a valid id');
    }

    const driverExists = await this.driverRepository.findById(id);
    if (!driverExists) {
      throw new Error('Invalid driver id');
    }

    const driverIsBusy = await this.carUseRepository.findDriverById(id);
    for (const driver of driverIsBusy) {
      if (driver && !driver.finalDate) {
        throw new Error('You cannot delete a driver that is busy');
      }
    }

    await this.driverRepository.delete(id);
  }
}

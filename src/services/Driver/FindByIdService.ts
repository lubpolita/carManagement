/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import { Driver } from '../../shared/typeorm/entities/Driver';
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('DriverRepository')
    private readonly driverRepository: IDriverRepository,
  ) {}

  public async execute(id: string): Promise<Driver | undefined> {
    const driver = await this.driverRepository.findById(id);
    return driver;
  }
}

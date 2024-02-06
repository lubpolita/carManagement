/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import { CarUse } from '../../shared/typeorm/entities/CarUse';
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('CarUseRepository')
    private readonly carUseRepository: ICarUseRepository,
  ) {}

  public async execute(id: string): Promise<CarUse[] | undefined> {
    const carUse = await this.carUseRepository.findDriverById(id);
    return carUse;
  }
}

import { inject, injectable } from 'tsyringe'
import { CarUse } from '../../shared/typeorm/entities/CarUse'
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository'

@injectable()
export default class FindAllCarUseByDriverService {
  constructor (
    @inject('CarUseRepository')
    private readonly carUseRepository: ICarUseRepository
  ) {

  }

  public async execute (id: string): Promise<CarUse[] | undefined> {
    const carUseArray = await this.carUseRepository.findDriverById(id)
    return carUseArray
  }
}
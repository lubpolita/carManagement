import { inject, injectable } from 'tsyringe'
import { CarUse } from '../../shared/typeorm/entities/CarUse'
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository'

@injectable()
export default class FindAllcarUseService {
  constructor (
    @inject('CarUseRepository')
    private readonly carUseRepository: ICarUseRepository
  ) {

  }

  public async execute (): Promise<CarUse[] | undefined> {
    const carUseArray = await this.carUseRepository.findAll()
    return carUseArray
  }
}
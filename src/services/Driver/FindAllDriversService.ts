import { inject, injectable } from 'tsyringe'
import { Driver } from '../../shared/typeorm/entities/Driver'
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository'

@injectable()
export default class FindAllcarService {
  constructor (
    @inject('DriverRepository')
    private readonly driverRepository: IDriverRepository
  ) {

  }

  public async execute (): Promise<Driver[] | undefined> {
    const driverArray = await this.driverRepository.findAll()
    return driverArray
  }
}
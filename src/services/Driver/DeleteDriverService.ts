import { inject, injectable } from 'tsyringe'
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository'

@injectable()
export default class DeleteDriverService {
    constructor(
        @inject('DriverRepository')
        private readonly driverRepository: IDriverRepository
    ) {
    }

    public async execute(id: string): Promise<void> {
        await this.driverRepository.delete(id)

    }
}
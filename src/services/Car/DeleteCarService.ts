import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository'

@injectable()
export default class CreateCarService {
    constructor(
        @inject('CarRepository')
        private readonly creditorRepository: ICarsRepository
    ) {
    }

    public async execute(id: string): Promise<void> {
        await this.creditorRepository.delete(id)

    }
}
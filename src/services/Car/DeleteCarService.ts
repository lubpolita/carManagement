import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository'

@injectable()
export default class DeleteCarService {
    constructor(
        @inject('CarRepository')
        private readonly carRepository: ICarsRepository
    ) {
    }

    public async execute(id: string): Promise<void> {
        await this.carRepository.delete(id)

    }
}
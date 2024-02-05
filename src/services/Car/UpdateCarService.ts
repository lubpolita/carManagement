import { inject, injectable } from 'tsyringe'
import { Car } from '../../shared/typeorm/entities/Car'
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository'

@injectable()
export default class UpdateCarService {
    constructor(
        @inject('CarRepository')
        private readonly carRepository: ICarsRepository
    ) {

    }

    public async execute({ id, color, brand, licensePlate }): Promise<void> {

        if (!id) {
            throw new Error('Please, enter a valid Id')
        }

        const car = await this.carRepository.findById(id);

        if(!car){
            throw new Error('Id not found')
        }

        color !== undefined ? car.color : color,
        brand !== undefined ? car.brand : brand,
        licensePlate !== undefined ? car.licensePlate : licensePlate

        await this.carRepository.update(car)
    }
}
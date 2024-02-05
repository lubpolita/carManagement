import { inject, injectable } from 'tsyringe';
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository';

@injectable()
export default class EndCarUseService {
    constructor(
        @inject('CarUseRepository')
        private readonly carUseRepository: ICarUseRepository
    ) {

    }

    public async execute(id: string): Promise<void> {

        if (!id) {
            throw new Error('Please, enter a valid Id')
        }

        const carUse = await this.carUseRepository.findById(id);

        if(!carUse){
            throw new Error('Id not found')
        }

        if (carUse.finalDate) {
            throw new Error('Implossible terminate a contract that has already been terminated.')
        }

        carUse.finalDate = new Date();

        await this.carUseRepository.update(carUse)
    }
}
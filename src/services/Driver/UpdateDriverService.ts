import { inject, injectable } from 'tsyringe'
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository'

@injectable()
export default class UpdateDriverService {
    constructor(
        @inject('DriverRepository')
        private readonly driverRepository: IDriverRepository
    ) {

    }

    public async execute({ id, name }): Promise<void> {

        if (!id) {
            throw new Error('Please, enter a valid Id')
        }

        const driver = await this.driverRepository.findById(id);

        if(!id){
            throw new Error('Id not found')
        }

        if(!name){
            throw new Error('Please, enter a valid name')
        }
        
        driver.name = name

        await this.driverRepository.update(driver)
    }
}
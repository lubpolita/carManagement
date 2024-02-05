import 'reflect-metadata'
import CreateDriverService from '../../services/Driver/CreateDriverService'
import DeleteDriverService from '../../services/Driver/DeleteDriverService'
import FindAllDriverService from '../../services/Driver/FindAllDriversService'
import FindByIdService from '../../services/Driver/FindByIdService'
import UpdateDriverService from '../../services/Driver/UpdateDriverService'
import { Driver } from '../../shared/typeorm/entities/Driver'
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository'
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository'
import { FakeCarUseRepository } from '../../shared/typeorm/repositories/fakes/FakeCarUseRepository'
import { FakeDriverRepository } from '../../shared/typeorm/repositories/fakes/FakeDriverRepository'

describe('Driver Service', () => {
    let createDriverService: CreateDriverService
    let deleteDriverService: DeleteDriverService
    let updateDriverService: UpdateDriverService
    let findByIdDriverService: FindByIdService
    let findAllDriverService: FindAllDriverService

    let fakeDriverRepository: IDriverRepository
    let fakeCarUseRepository: ICarUseRepository
  
    beforeEach(async () => {
        fakeDriverRepository = new FakeDriverRepository();
        fakeCarUseRepository = new FakeCarUseRepository();

      createDriverService = new CreateDriverService(fakeDriverRepository)
      deleteDriverService = new DeleteDriverService(fakeDriverRepository, fakeCarUseRepository)
      updateDriverService = new UpdateDriverService(fakeDriverRepository)
      findByIdDriverService = new FindByIdService(fakeDriverRepository)
      findAllDriverService = new FindAllDriverService(fakeDriverRepository)
    });

    it('Should be able to create a new driver', async () => {
    
       const driver = await createDriverService.execute({ name: "Bruno" });
                

        expect(driver).toBeInstanceOf(Driver)
        expect(driver.name).toEqual('Bruno')
    })
    
    it('Should be able to update a new driver', async () => {
        const driver = await fakeDriverRepository.create( { name: "Bruno" });
       await updateDriverService.execute({ id: driver.id, name: "Vasconcelos" })
                 
    })

    it('Should be able to delete a driver', async () => {
        
        const driver = await fakeDriverRepository.create({ name: "João" })
        
        await deleteDriverService.execute(driver.id);

        await expect( async () => { await deleteDriverService.execute('id_error')
        }).rejects.toThrow(Error('Invalid driver id'))
     })
    
    it('Should be able to find by id a driver', async () => {
        const driver = await fakeDriverRepository.create({ name: "Luiza" });
        const act = await findByIdDriverService.execute(driver.id);
        expect(driver).toBeInstanceOf(Driver);      
    })
   
    it('Should be able to find all drivers', async () => {
         await fakeDriverRepository.create({ name: "Luiza" });
        const act = await findAllDriverService.execute();
        expect(act).toHaveLength(1)    
    })
})

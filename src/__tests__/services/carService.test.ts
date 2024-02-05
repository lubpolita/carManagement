import 'reflect-metadata'
import CreateCarService from '../../services/Car/CreateCarService'
import DeleteCarService from '../../services/Car/DeleteCarService'
import FindAllCarService from '../../services/Car/FindAllCarsService'
import FindByIdService from '../../services/Car/FindByIdService'
import UpdateCarService from '../../services/Car/UpdateCarService'
import { Car } from '../../shared/typeorm/entities/Car'
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository'
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository'
import { FakeCarRepository } from '../../shared/typeorm/repositories/fakes/FakeCarRepository'
import { FakeCarUseRepository } from '../../shared/typeorm/repositories/fakes/FakeCarUseRepository'

describe('Car Service', () => {
    let createCarService: CreateCarService
    let deleteCarService: DeleteCarService
    let updateCarService: UpdateCarService
    let findByIdCarService: FindByIdService
    let findAllCarService: FindAllCarService

    let fakeCarRepository: ICarsRepository
    let fakeCarUseRepository: ICarUseRepository
  
    beforeEach(async () => {
        fakeCarRepository = new FakeCarRepository()
        fakeCarUseRepository = new FakeCarUseRepository()
        
      createCarService = new CreateCarService(fakeCarRepository)
      deleteCarService = new DeleteCarService(fakeCarRepository, fakeCarUseRepository)
      updateCarService = new UpdateCarService(fakeCarRepository)
      findByIdCarService = new FindByIdService(fakeCarRepository)
      findAllCarService = new FindAllCarService(fakeCarRepository)
    })

    it('Should be able to create a new car', async () => {
    
       const car = await createCarService.execute({ brand: 'brand test',
                                                    color: 'green',
                                                    licensePlate: 'AAAA' })
                

        expect(car).toBeInstanceOf(Car)
        expect(car.color).toEqual('green')
        expect(car.brand).toEqual('brand test')
        expect(car.licensePlate).toEqual('AAAA')
    })

    it('Should be able to delete a car', async () => {
        
        const car = await fakeCarRepository.create({
            brand: 'brand test', color: 'green',
            licensePlate: 'AAAA'
        })
        
        await deleteCarService.execute(car.id)
     })
     
    
    it('Should be able to update a new car', async () => {
        const car = await fakeCarRepository.create({
            brand: 'brand test', color: 'green',
            licensePlate: 'AAAA' })
       await updateCarService.execute({ brand: 'brand test',
                                        color: 'blue',
                                        licensePlate: 'AAAA',
           id: car.id
       })
        
       await expect( async () => { await updateCarService.execute({ brand: 'brand test',
       color: 'blue',
       licensePlate: 'AAAA',
id: 'error'
})
         }).rejects.toThrow(Error('Id not found'))         
    })
    
    it('Should be able to find by id a car', async () => {
        const car = await fakeCarRepository.create({
            brand: 'brand test', color: 'green',
            licensePlate: 'AAAA' })
        const act = await findByIdCarService.execute(car.id)
        expect(car).toBeInstanceOf(Car)      
    })
   
    it('Should be able to find all cars', async () => {
         await fakeCarRepository.create({
            brand: 'brand test', color: 'green',
            licensePlate: 'AAAA' })
        const act = await findAllCarService.execute()
        expect(act).toHaveLength(1)    
    })
})

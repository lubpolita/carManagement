import 'reflect-metadata';
import CreateCarUseService from '../../services/CarUse/CreateCarUseService';
import EndCarUseService from '../../services/CarUse/EndCarUseService';
import FindAllCarUseByDriverService from '../../services/CarUse/FindAllCarUseByDriverService';
import FindAllCarUseService from '../../services/CarUse/FindAllCarUseService';
import { CarUse } from '../../shared/typeorm/entities/CarUse';
import { ICarsRepository } from '../../shared/typeorm/repositories/Car/ICarRepository';
import { ICarUseRepository } from '../../shared/typeorm/repositories/CarUse/ICarUseRepository';
import { IDriverRepository } from '../../shared/typeorm/repositories/Driver/IDriverRepository';
import { FakeCarRepository } from '../../shared/typeorm/repositories/fakes/FakeCarRepository';
import { FakeCarUseRepository } from '../../shared/typeorm/repositories/fakes/FakeCarUseRepository';
import { FakeDriverRepository } from '../../shared/typeorm/repositories/fakes/FakeDriverRepository';

describe('CarUse Service', () => {
  let createCarUseService: CreateCarUseService;
  let endCarUseService: EndCarUseService;
  let findAllCarUseService: FindAllCarUseService;
  let findAllCarUseByDriverService: FindAllCarUseByDriverService;

  let fakeCarUseRepository: ICarUseRepository;
  let fakeCarRepository: ICarsRepository;
  let fakeDriverRepository: IDriverRepository;

  beforeEach(async () => {
    fakeCarUseRepository = new FakeCarUseRepository();
    fakeCarRepository = new FakeCarRepository();
    fakeDriverRepository = new FakeDriverRepository();

    createCarUseService = new CreateCarUseService(
      fakeCarUseRepository,
      fakeCarRepository,
      fakeDriverRepository,
    );
    endCarUseService = new EndCarUseService(fakeCarUseRepository);
    findAllCarUseByDriverService = new FindAllCarUseByDriverService(
      fakeCarUseRepository,
    );
    findAllCarUseService = new FindAllCarUseService(fakeCarUseRepository);
  });

  it('Should be able to create a new car use', async () => {
    const car = await fakeCarRepository.create({
      brand: 'brand test',
      color: 'green',
      licensePlate: 'AAAA',
    });

    const car2 = await fakeCarRepository.create({
      brand: 'brand test',
      color: 'blue',
      licensePlate: 'AAAA',
    });

    const driver = await fakeDriverRepository.create({ name: 'Maria' });

    const act = await createCarUseService.execute({
      carId: car.id,
      driverId: driver.id,
      startDate: '12-03-2021',
      reason: 'reason',
      finalDate: '',
    });
    expect(act).toBeInstanceOf(CarUse);

    await expect(async () => {
      await createCarUseService.execute({
        carId: car.id,
        driverId: driver.id,
        startDate: '12-03-2021',
        reason: 'reason',
        finalDate: '',
      });
    }).rejects.toThrow(Error('Car is busy'));

    await expect(async () => {
      await createCarUseService.execute({
        carId: car2.id,
        driverId: driver.id,
        startDate: '12-03-2021',
        reason: 'reason',
        finalDate: '',
      });
    }).rejects.toThrow(Error('Driver is busy'));
  });

  it('Should be able to find all car use', async () => {
    const car = await fakeCarRepository.create({
      brand: 'brand test',
      color: 'green',
      licensePlate: 'AAAA',
    });

    const driver = await fakeDriverRepository.create({ name: 'Maria' });
    await createCarUseService.execute({
      carId: car.id,
      driverId: driver.id,
      startDate: '12-03-2021',
      reason: 'reason',
      finalDate: '',
    });

    const act = await findAllCarUseService.execute();
    expect(act).toHaveLength(1);
  });

  it('Should be able to end car use', async () => {
    const car = await fakeCarRepository.create({
      brand: 'brand test',
      color: 'green',
      licensePlate: 'AAAA',
    });

    const driver = await fakeDriverRepository.create({ name: 'Maria' });
    const carUse = await createCarUseService.execute({
      carId: car.id,
      driverId: driver.id,
      startDate: '12-03-2021',
      reason: 'reason',
      finalDate: '',
    });

    await endCarUseService.execute(carUse.id);

    await expect(async () => {
      await endCarUseService.execute(carUse.id);
    }).rejects.toThrow(
      Error(
        'Implossible terminate a contract that has already been terminated.',
      ),
    );

    await expect(async () => {
      await endCarUseService.execute('');
    }).rejects.toThrow(Error('Please, enter a valid Id'));

    await expect(async () => {
      await endCarUseService.execute('id_error');
    }).rejects.toThrow(Error('Id not found'));
  });

  it('Should be able to find by a driver id a car use', async () => {
    const carUse = await fakeCarUseRepository.create({
      carId: 'carid',
      driverId: 'driverid',
      finalDate: '2023-04-02',
      startDate: '2023-04-01',
      reason: 'reason',
    });
    const act = await findAllCarUseByDriverService.execute(carUse.driverId);
    expect(act).toHaveLength(1);
  });
});

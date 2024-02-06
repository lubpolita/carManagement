import { container } from 'tsyringe';
import CarRepository from '../../typeorm/repositories/Car/CarRepository';
import { ICarsRepository } from '../../typeorm/repositories/Car/ICarRepository';
import CarUseRepository from '../../typeorm/repositories/CarUse/CarUseRepository';
import { ICarUseRepository } from '../../typeorm/repositories/CarUse/ICarUseRepository';
import DriverRepository from '../../typeorm/repositories/Driver/DriverRepository';
import { IDriverRepository } from '../../typeorm/repositories/Driver/IDriverRepository';

container.registerSingleton<ICarsRepository>('CarRepository', CarRepository);

container.registerSingleton<ICarUseRepository>(
  'CarUseRepository',
  CarUseRepository,
);

container.registerSingleton<IDriverRepository>(
  'DriverRepository',
  DriverRepository,
);

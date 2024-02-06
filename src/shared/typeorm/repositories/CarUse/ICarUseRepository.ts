import { ICreateCarUseDTO } from '../../../../dtos/CreateCarUseDTO';
import { CarUse } from '../../entities/CarUse';

export interface ICarUseRepository {
  findById: (id: string) => Promise<CarUse | undefined>;
  create: (data: ICreateCarUseDTO) => Promise<CarUse>;
  update: (data: CarUse) => Promise<CarUse>;
  findAll: () => Promise<CarUse[] | undefined>;
  findCarById: (id: string) => Promise<CarUse[] | undefined>;
  findDriverById: (id: string) => Promise<CarUse[] | undefined>;
}

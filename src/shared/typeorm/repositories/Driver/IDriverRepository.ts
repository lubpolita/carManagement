import { ICreateDriverDTO } from '../../../../dtos/CreateDriverDTO';
import { Driver } from '../../entities/Driver';

export interface IDriverRepository {
  findById: (id: string) => Promise<Driver | undefined>;
  create: (data: ICreateDriverDTO) => Promise<Driver>;
  update: (data: Driver) => Promise<Driver>;
  delete(id: string): Promise<void>;
  findAll: () => Promise<Driver[] | undefined>;
}

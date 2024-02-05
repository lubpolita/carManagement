import { v4 as uuidV4 } from 'uuid';
import { ICreateDriverDTO } from '../../../../dtos/CreateDriverDTO';
import { Driver } from '../../entities/Driver';
import { IDriverRepository } from '../Driver/IDriverRepository';

export class FakeDriverRepository implements IDriverRepository {
  private fakeRepository: Driver[];

  constructor(drivers?: Driver[]) {
    this.fakeRepository = drivers || [];
  }

  async create(driver: ICreateDriverDTO): Promise<Driver | undefined> {
    const fakeDriver = new Driver();

    Object.assign(fakeDriver, driver);

    fakeDriver.id = uuidV4();

    this.fakeRepository.push(fakeDriver);

    return fakeDriver;
  }

  async delete(id: string): Promise<void> {
    const drivers = this.fakeRepository.filter(driver => driver.id !== id);
    this.fakeRepository = drivers;
  }

  async update(driver: Driver): Promise<Driver> {
    const oldDriver = this.fakeRepository.find(foundDriver => foundDriver.id === driver.id);

    if (oldDriver) {
      Object.assign(oldDriver, driver);
    }

    return driver;
  }

  async findAll(): Promise<Driver[]> {
    return this.fakeRepository;
  }

  async findById(id: string): Promise<Driver> {
    return this.fakeRepository.find(driver => driver.id === id);
  }
}

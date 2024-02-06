import { v4 as uuidV4 } from 'uuid';
import { ICreateCarUseDTO } from '../../../../dtos/CreateCarUseDTO';
import { CarUse } from '../../entities/CarUse';
import { ICarUseRepository } from '../CarUse/ICarUseRepository';

export class FakeCarUseRepository implements ICarUseRepository {
  private fakeRepository: CarUse[];

  constructor(carUses?: CarUse[]) {
    this.fakeRepository = carUses || [];
  }

  async create(carUse: ICreateCarUseDTO): Promise<CarUse | undefined> {
    const fakeCarUse = new CarUse();

    Object.assign(fakeCarUse, carUse);

    fakeCarUse.id = uuidV4();

    this.fakeRepository.push(fakeCarUse);

    return fakeCarUse;
  }

  async update(carUse: CarUse): Promise<CarUse> {
    const oldCarUse = this.fakeRepository.find(
      foundCarUse => foundCarUse.id === carUse.id,
    );

    if (oldCarUse) {
      Object.assign(oldCarUse, carUse);
    }

    return carUse;
  }

  async findAll(): Promise<CarUse[]> {
    return this.fakeRepository;
  }

  async findById(id: string): Promise<CarUse> {
    return this.fakeRepository.find(carUse => carUse.id === id);
  }

  async findCarById(id: string): Promise<CarUse[]> {
    const car = this.fakeRepository.find(carUse => carUse.carId === id);
    const cars = [];
    cars.push(car);
    return cars;
  }

  async findDriverById(id: string): Promise<CarUse[]> {
    const car = this.fakeRepository.find(carUse => carUse.driverId === id);
    const cars = [];
    cars.push(car);
    return cars;
  }
}

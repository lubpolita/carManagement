/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidV4 } from 'uuid';
import { ICreateCarDTO } from '../../../../dtos/CreateCarDTO';
import { Car } from '../../entities/Car';
import { ICarsRepository } from '../Car/ICarRepository';

export class FakeCarRepository implements ICarsRepository {
  private fakeRepository: Car[];

  constructor(cars?: Car[]) {
    this.fakeRepository = cars || [];
  }

  async create(car: ICreateCarDTO): Promise<Car | undefined> {
    const fakeCar = new Car();

    Object.assign(fakeCar, car);

    fakeCar.id = uuidV4();

    this.fakeRepository.push(fakeCar);

    return fakeCar;
  }

  async delete(id: string): Promise<void> {
    const cars = this.fakeRepository.filter(car => car.id !== id);
    this.fakeRepository = cars;
  }

  async update(car: Car): Promise<Car> {
    const oldCar = this.fakeRepository.find(foundCar => foundCar.id === car.id);

    if (oldCar) {
      Object.assign(oldCar, car);
    }

    return car;
  }

  async findAll(): Promise<Car[]> {
    return this.fakeRepository;
  }

  async findById(id: string): Promise<Car> {
    return this.fakeRepository.find(car => car.id === id);
  }
}

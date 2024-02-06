import { Repository } from 'typeorm';
import { dataSource } from '../..';
import { ICreateCarDTO } from '../../../../dtos/CreateCarDTO';
import { Car } from '../../entities/Car';
import { ICarsRepository } from './ICarRepository';

export default class CarRepository implements ICarsRepository {
  private readonly ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Car);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create(data);
    await this.ormRepository.save(car);
    return car;
  }

  public async findById(id: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne({ where: { id } });
    return car;
  }

  public async findAll(): Promise<Car[] | undefined> {
    const car = await this.ormRepository.find();
    return car;
  }

  public async update(data: Car): Promise<Car> {
    const car = await this.ormRepository.save(data);
    return car;
  }
}

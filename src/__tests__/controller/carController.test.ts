import request from 'supertest';
import app from '../../app';
import CreateCarService from '../../services/Car/CreateCarService';
import DeleteCarService from '../../services/Car/DeleteCarService';
import FindAllCarService from '../../services/Car/FindAllCarsService';
import FindByIdCarService from '../../services/Car/FindByIdService';
import UpdateCarService from '../../services/Car/UpdateCarService';
import { Car } from '../../shared/typeorm/entities/Car';

jest.mock('../../services/Car/CreateCarService');
const createCarServiceMock = CreateCarService as jest.MockedClass<
  typeof CreateCarService
>;

jest.mock('../../services/Car/FindAllCarsService');
const findAllCarServiceMock = FindAllCarService as jest.MockedClass<
  typeof FindAllCarService
>;

jest.mock('../../services/Car/FindByIdService');
const findByIdCarServiceMock = FindByIdCarService as jest.MockedClass<
  typeof FindByIdCarService
>;

jest.mock('../../services/Car/DeleteCarService');
const deleteCarServiceMock = DeleteCarService as jest.MockedClass<
  typeof DeleteCarService
>;

jest.mock('../../services/Car/UpdateCarService');
const updateCarServiceMock = UpdateCarService as jest.MockedClass<
  typeof UpdateCarService
>;

describe('Car', () => {
  beforeAll(async () => {
    createCarServiceMock.mockClear();
    findAllCarServiceMock.mockClear();
    findByIdCarServiceMock.mockClear();
    deleteCarServiceMock.mockClear();
    updateCarServiceMock.mockClear();
  });
  afterAll(async () => {
    createCarServiceMock.mockReset();
    findAllCarServiceMock.mockReset();
    findByIdCarServiceMock.mockReset();
    deleteCarServiceMock.mockReset();
    updateCarServiceMock.mockReset();
  });

  it('Should be able to create a new car', async () => {
    await createCarServiceMock.prototype.execute.mockResolvedValueOnce(
      new Car(),
    );

    const response = await request(app).post('/car').send({
      licensePlate: 'XYZ789',
      color: 'Blue',
      brand: 'Honda',
    });

    expect(response.status).toBe(201);
    expect(response.body).not.toBe(undefined);
  });

  it('Should be able to get all cars', async () => {
    await findAllCarServiceMock.prototype.execute.mockResolvedValueOnce([
      new Car(),
    ]);

    const response = await request(app).get('/car');
    expect(response.status).toBe(201);
    expect(response.body).not.toBe(undefined);
  });

  it('Should be able to get a car by id', async () => {
    await findByIdCarServiceMock.prototype.execute.mockResolvedValueOnce(
      new Car(),
    );

    const response = await request(app).get('/car/123');
    expect(response.status).toBe(201);
    expect(response.body).not.toBe(undefined);
  });

  it('Should be able to delete a car by id', async () => {
    await deleteCarServiceMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).delete('/car/delete/123');
    expect(response.status).toBe(201);
  });

  it('Should be able to update a car by id', async () => {
    await updateCarServiceMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).patch('/car/update/123');
    expect(response.status).toBe(201);
  });
});

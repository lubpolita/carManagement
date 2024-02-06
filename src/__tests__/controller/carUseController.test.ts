import request from 'supertest';
import app from '../../app';
import CreateCarUseService from '../../services/CarUse/CreateCarUseService';
import EndCarUseService from '../../services/CarUse/EndCarUseService';
import FindAllCarUseByDriverService from '../../services/CarUse/FindAllCarUseByDriverService';
import FindAllCarUseService from '../../services/CarUse/FindAllCarUseService';
import FindByIdCarUseService from '../../services/CarUse/FindByIdService';
import { CarUse } from '../../shared/typeorm/entities/CarUse';

jest.mock('../../services/CarUse/CreateCarUseService');
const createCarUseServiceMock = CreateCarUseService as jest.MockedClass<
  typeof CreateCarUseService
>;

jest.mock('../../services/CarUse/FindAllCarUseService');
const findAllCarUseServiceMock = FindAllCarUseService as jest.MockedClass<
  typeof FindAllCarUseService
>;

jest.mock('../../services/CarUse/FindByIdService');
const findByIdCarUseServiceMock = FindByIdCarUseService as jest.MockedClass<
  typeof FindByIdCarUseService
>;

jest.mock('../../services/CarUse/EndCarUseService');
const endCarUseService = EndCarUseService as jest.MockedClass<
  typeof EndCarUseService
>;

jest.mock('../../services/CarUse/FindAllCarUseByDriverService');
const findAllCarUseByDriverServiceMock =
  FindAllCarUseByDriverService as jest.MockedClass<
    typeof FindAllCarUseByDriverService
  >;

describe('CarUse', () => {
  beforeAll(async () => {
    createCarUseServiceMock.mockClear();
    findAllCarUseServiceMock.mockClear();
    findByIdCarUseServiceMock.mockClear();
    endCarUseService.mockClear();
    findAllCarUseByDriverServiceMock.mockClear();
  });
  afterAll(async () => {
    createCarUseServiceMock.mockReset();
    findAllCarUseServiceMock.mockReset();
    findByIdCarUseServiceMock.mockReset();
    endCarUseService.mockReset();
    findAllCarUseByDriverServiceMock.mockReset();
  });

  it('Should be able to create a new car use', async () => {
    await createCarUseServiceMock.prototype.execute.mockResolvedValueOnce(
      new CarUse(),
    );

    const response = await request(app).post('/car_use').send({
      startDate: '2024-02-05T12:00:00Z',
      reason: 'Viagem de negócios',
      carId: '689be5ae-3545-4e3b-8c01-f277b691bbb0',
      driverId: 'dcafcddb-e4c3-417e-9119-b9876d6b735d',
    });

    expect(response.status).toBe(201);
    expect(response.body).not.toBe(undefined);
  });

  it('Should be able to get all car uses', async () => {
    await findAllCarUseServiceMock.prototype.execute.mockResolvedValueOnce([
      new CarUse(),
    ]);

    const response = await request(app).get('/car_use');
    expect(response.status).toBe(201);
    expect(response.body).not.toBe(undefined);
  });

  it('Should be able to get a car use by id', async () => {
    await findByIdCarUseServiceMock.prototype.execute.mockResolvedValueOnce(
      new CarUse(),
    );

    const response = await request(app).get('/car_use/123');
    expect(response.status).toBe(201);
    expect(response.body).not.toBe(undefined);
  });

  it('Should be able to end a car use by id', async () => {
    await endCarUseService.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).patch('/car_use/end/123');
    expect(response.status).toBe(201);
  });

  it('Should be able to find a car use by driver id', async () => {
    await findAllCarUseByDriverServiceMock.prototype.execute.mockResolvedValueOnce(
      [new CarUse()],
    );

    const response = await request(app).get('/car_use/driver/123');
    expect(response.status).toBe(201);
    expect(response.body).not.toBe(undefined);
  });
});

import request from 'supertest'
import app from '../../app'
import CreateDriverService from '../../services/Driver/CreateDriverService'
import DeleteDriverService from '../../services/Driver/DeleteDriverService'
import FindAllDriverService from '../../services/Driver/FindAllDriversService'
import FindByIdDriverService from '../../services/Driver/FindByIdService'
import UpdateDriverService from '../../services/Driver/UpdateDriverService'
import { Driver } from '../../shared/typeorm/entities/Driver'

jest.mock('../../services/Driver/CreateDriverService');
const createDriverServiceMock = CreateDriverService as jest.MockedClass<
  typeof CreateDriverService
  >

jest.mock('../../services/Driver/FindAllDriversService');
const findAllDriverServiceMock = FindAllDriverService as jest.MockedClass<
  typeof FindAllDriverService
  >

jest.mock('../../services/Driver/FindByIdService');
const findByIdDriverServiceMock = FindByIdDriverService as jest.MockedClass<
  typeof FindByIdDriverService
  >

  jest.mock('../../services/Driver/DeleteDriverService');
const deleteDriverServiceMock = DeleteDriverService as jest.MockedClass<
  typeof DeleteDriverService
  >

jest.mock('../../services/Driver/UpdateDriverService');
const updateDriverServiceMock = UpdateDriverService as jest.MockedClass<
  typeof UpdateDriverService
>

describe('Driver', () => {
  beforeAll(async () => {
    createDriverServiceMock.mockClear()
    findAllDriverServiceMock.mockClear()
    findByIdDriverServiceMock.mockClear()
    deleteDriverServiceMock.mockClear()
    updateDriverServiceMock.mockClear()
  })
  afterAll(async () => {
    createDriverServiceMock.mockReset()
    findAllDriverServiceMock.mockReset()
    findByIdDriverServiceMock.mockReset()
    deleteDriverServiceMock.mockReset()
    updateDriverServiceMock.mockReset()
  })

    it('Should be able to create a new driver', async () => {
    
        await createDriverServiceMock.prototype.execute.mockResolvedValueOnce(new Driver(),);
        
    const response = await request(app).post('/driver').send({
      "name": "Luiza",
    })

    expect(response.status).toBe(201)
    expect(response.body).not.toBe(undefined)
  })

      it('Should be able to get all drivers', async () => {
    
        await findAllDriverServiceMock.prototype.execute.mockResolvedValueOnce([ new Driver() ]);
        
    const response = await request(app).get('/driver')
    expect(response.status).toBe(201)
    expect(response.body).not.toBe(undefined)
  })

  it('Should be able to get a driver by id', async () => {
    
    await findByIdDriverServiceMock.prototype.execute.mockResolvedValueOnce(new Driver());
    
const response = await request(app).get('/driver/123')
expect(response.status).toBe(201)
expect(response.body).not.toBe(undefined)
  })
  
  it('Should be able to delete a driver by id', async () => {
    
    await deleteDriverServiceMock.prototype.execute.mockResolvedValueOnce();
    
const response = await request(app).delete('/driver/delete/123')
expect(response.status).toBe(201)
  })
  
  it('Should be able to update a driver by id', async () => {
    
    await updateDriverServiceMock.prototype.execute.mockResolvedValueOnce();
    
const response = await request(app).patch('/driver/update/123')
expect(response.status).toBe(201)
})

})

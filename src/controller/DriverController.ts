import { Request, Response } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import CreateDriverService from '../services/Driver/CreateDriverService'
import DeleteDriverService from '../services/Driver/DeleteDriverService'
import FindAllDriverService from '../services/Driver/FindAllDriversService'
import FindByIdService from '../services/Driver/FindByIdService'
import UpdateDriverService from '../services/Driver/UpdateDriverService'

export class DriverController {
  public async create (request: Request, response: Response): Promise<Response> {
    try {
      const createDriver = container.resolve(CreateDriverService)
      const driver = await createDriver.execute(request.body)
      console.dir(driver)
      return response.status(201).json(driver)
    } catch (err) {
      console.error(err)
      return response.status(400).json({
        message: err.message
      })
    }
  }


  public async findById (request: Request, response: Response): Promise <Response | undefined> {
    try {
      const find = container.resolve(FindByIdService)
      const { id } = request.params
      const driver = await find.execute(id)
      console.dir(driver)
      return response.status(201).json(driver)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  public async findAll (request: Request, response: Response): Promise <Response> {
    try {
      const findAllDriver = container.resolve(FindAllDriverService)
      const driverArray = await findAllDriver.execute()
      return response.status(201).json(driverArray)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  public async delete (request: Request, response: Response): Promise <Response> {
    try {
      const deleteDriver = container.resolve(DeleteDriverService)
      await deleteDriver.execute(request.body)
      return response.status(201).json()
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  public async update (request: Request, response: Response): Promise<Response> {
    try {
      const updateDriver = container.resolve(UpdateDriverService)
      const { id } = request.params;
      const { name } = request.body;

      const driver = await updateDriver.execute({ id, name })
      console.dir(driver)
      return response.status(201).json(driver)
    } catch (err) {
      console.error(err)
      return response.status(400).json({
        message: err.message
      })
    }
  }


}
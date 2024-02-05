import { Request, Response } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import CreateCarService from '../services/Car/CreateCarService'
import DeleteCarService from '../services/Car/DeleteCarService'
import FindAllCarService from '../services/Car/FindAllCarsService'
import FindByIdService from '../services/Car/FindByIdService'
import UpdateCarService from '../services/Car/UpdateCarService'

export class CarController {
  public async create (request: Request, response: Response): Promise<Response> {
    try {
      const createCar = container.resolve(CreateCarService)
      const car = await createCar.execute(request.body)
      console.dir(car)
      return response.status(201).json(car)
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
      const car = await find.execute(id)
      console.dir(car)
      return response.status(201).json(car)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  public async findAll (request: Request, response: Response): Promise <Response> {
    try {
      const findAllCar = container.resolve(FindAllCarService)
      const carArray = await findAllCar.execute()
      return response.status(201).json(carArray)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  public async delete (request: Request, response: Response): Promise <Response> {
    try {
      const deleteCar = container.resolve(DeleteCarService)
      const { id } = request.params
      await deleteCar.execute(id)
      return response.status(201).json()
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  public async update (request: Request, response: Response): Promise<Response> {
    try {
      const updateCar = container.resolve(UpdateCarService)
      const { id } = request.params;
      const { licensePlate, color, brand } = request.body;

      const car = await updateCar.execute({ id, licensePlate, color, brand })
      console.dir(car)
      return response.status(201).json(car)
    } catch (err) {
      console.error(err)
      return response.status(400).json({
        message: err.message
      })
    }
  }


}
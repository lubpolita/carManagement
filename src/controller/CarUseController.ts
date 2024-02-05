import { Request, Response } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import CreateCarUseService from '../services/CarUse/CreateCarUseService'
import EndCarUseService from '../services/CarUse/EndCarUseService'
import FindAllCarUseService from '../services/CarUse/FindAllCarUseService'
import FindByIdService from '../services/CarUse/FindByIdService'

export class CarUseController {
  public async create (request: Request, response: Response): Promise<Response> {
    try {
      const createCarUse = container.resolve(CreateCarUseService)
      const carUse = await createCarUse.execute(request.body)
      console.dir(carUse)
      return response.status(201).json(carUse)
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
      const carUse = await find.execute(id)
      console.dir(carUse)
      return response.status(201).json(carUse)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  public async findAll (request: Request, response: Response): Promise <Response> {
    try {
      const findAllCarUse = container.resolve(FindAllCarUseService)
      const carUseArray = await findAllCarUse.execute()
      return response.status(201).json(carUseArray)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  public async endCarUse (request: Request, response: Response): Promise <Response> {
    try {
      const endCarUse = container.resolve(EndCarUseService)
      const { id }= request.params
      await endCarUse.execute(id)
      return response.status(201).json('Car use finished with success!')
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

}
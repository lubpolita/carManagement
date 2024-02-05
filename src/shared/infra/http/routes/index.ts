import { Router } from 'express'
import carRoutes from './car.routes'
import carUse from './carUse.routes'
import driverRoutes from './driver.routes'

const routes = Router()

routes.use('/car', carRoutes)
routes.use('/driver', driverRoutes)
routes.use('/car_use', carUse)

export default routes
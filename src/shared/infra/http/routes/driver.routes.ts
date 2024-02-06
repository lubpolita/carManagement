import { Router } from 'express';
import { DriverController } from '../../../../controller/DriverController';

const driverController = new DriverController();
const driverRoutes = Router();

driverRoutes.post('/', driverController.create);

driverRoutes.get('/', driverController.findAll);

driverRoutes.delete('/delete/:id', driverController.delete);

driverRoutes.patch('/update/:id', driverController.update);

driverRoutes.get('/:id', driverController.findById);

export default driverRoutes;

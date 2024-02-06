import { Router } from 'express';
import { CarController } from '../../../../controller/CarController';

const carController = new CarController();
const carRoutes = Router();

carRoutes.post('/', carController.create);

carRoutes.get('/', carController.findAll);

carRoutes.delete('/delete/:id', carController.delete);

carRoutes.patch('/update/:id', carController.update);

carRoutes.get('/:id', carController.findById);

export default carRoutes;

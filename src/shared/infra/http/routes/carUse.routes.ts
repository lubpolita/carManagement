import { Router } from 'express';
import { CarUseController } from '../../../../controller/CarUseController';

const carUseController = new CarUseController();
const carUseRoutes = Router();

carUseRoutes.post('/', carUseController.create);

carUseRoutes.get('/', carUseController.findAll);

carUseRoutes.get('/:id', carUseController.findById);

carUseRoutes.patch('/end/:id', carUseController.endCarUse);

carUseRoutes.get('/driver/:id', carUseController.findAllByDriver);

export default carUseRoutes;

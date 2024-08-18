import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.post('/', customerController.create.bind(customerController));
customerRouter.get('/', customerController.findAll.bind(customerController));
customerRouter.get('/:id', customerController.findById.bind(customerController));
customerRouter.put('/:id', customerController.update.bind(customerController));
customerRouter.delete('/:id', customerController.delete.bind(customerController));
customerRouter.get('/search/:name', customerController.search.bind(customerController)); 

export default customerRouter;

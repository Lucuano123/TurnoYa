import { Router } from 'express';
import { CustomersController } from './customers.controller.js';

export const customerRouter = Router();
const customersController = new CustomersController();

// Rutas limpias, sin auth y sin inyección manual
customerRouter.get('/all', customersController.getAllCustomers.bind(customersController));
customerRouter.get('/pending', customersController.getPendingUsers.bind(customersController));
customerRouter.put('/:id/validate', customersController.validateUser.bind(customersController));
customerRouter.get('/:id', customersController.getCustomerById.bind(customersController));
customerRouter.post('/', customersController.createCustomer.bind(customersController));
customerRouter.put('/:id', customersController.updateCustomer.bind(customersController));
customerRouter.delete('/:id', customersController.deleteCustomer.bind(customersController));

export default customerRouter;

import { Router } from 'express';
import { CustomersController } from './customers.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { CustomersService } from './customers.service.js';
import { CustomersPostgresRepository } from './customers.postgres.repository.js';

export const customerRouter = Router();
const customersRepository = new CustomersPostgresRepository();
const customersService = new CustomersService(customersRepository);
const customersController = new CustomersController(customersService);

// Rutas enlazadas con bind para que no se pierda el contexto de .this
customerRouter.put(
  '/:id/validate',
  authMiddleware(['professional']),
  customersController.validateUser.bind(customersController)
);

customerRouter.get(
  '/pending',
  authMiddleware(['professional']),
  customersController.getPendingUsers.bind(customersController)
);

// Nueva ruta (enlazada con bind)
customerRouter.get(
  '/all',
  authMiddleware(['professional']),
  customersController.getAllCustomers.bind(customersController)
);

export default customerRouter;
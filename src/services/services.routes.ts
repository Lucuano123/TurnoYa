import { Router } from 'express';
import { ServicesController } from './services.controller.js';
import { ServicesPostgresRepository } from './services.postgres.repository.js';

export const servicesRouter = Router();

// Instanciar repositorio y controlador (similar a customers.routes)
const servicesRepository = new ServicesPostgresRepository();
const servicesController = new ServicesController(servicesRepository as any);

// Rutas relativas — se montarán en /api/services desde app.ts
servicesRouter.get('/', servicesController.findAllservices);
servicesRouter.get('/:id', servicesController.findServiceById);
servicesRouter.put('/:id', servicesController.updateService);
servicesRouter.patch('/:id', servicesController.partialUpdateService);
servicesRouter.delete('/:id', servicesController.deleteService);
servicesRouter.post('/', servicesController.addService);

export default servicesRouter;



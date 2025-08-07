// Rutas para /services

import { Router } from 'express';
import { ServicesController } from './services.controller.js';

export const serviceRouter = Router();

// Definición de rutas
serviceRouter.get('/', ServicesController.getAll);

export default serviceRouter;
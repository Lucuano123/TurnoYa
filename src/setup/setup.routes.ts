import { Router } from 'express';
import { SetupController } from './setup.controller.js';

export const setupRouter = Router();
const setupController = new SetupController();

// Ruta para inicializar la base de datos
setupRouter.post('/database', setupController.setupDatabase.bind(setupController));

export default setupRouter;
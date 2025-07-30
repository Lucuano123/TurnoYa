import { Router } from 'express';
import { BookingsController } from './bookings.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

export const bookingsRouter = Router();
const bookingsController = new BookingsController();

// Ruta para obtener las reservas diarias del profesional (HU10)
bookingsRouter.get(
  '/professional/bookings',
 // authMiddleware(['professional']),
  bookingsController.getProfessionalBookings.bind(bookingsController)
);

export default bookingsRouter;
import { Router } from 'express';
import { BookingsController } from './bookings.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { BookingsPostgresRepository } from './bookings.postgres.repository.js';

export const bookingsRouter = Router();
const bookingsController = new BookingsController();

// Ruta para obtener las reservas diarias del profesional (HU10)
bookingsRouter.get(
  '/professional/bookings',
 // authMiddleware(['professional']),
  bookingsController.getProfessionalBookings.bind(bookingsController)
);

// Definición de rutas

bookingsRouter.post('/', sanitizeBookingInput, bookingsController.addBookings.bind(bookingsController));

function sanitizeBookingInput(req:any, res:any, next:any) {

  req.body.sanitizedInput = {
    id: req.body.id,
    clientId: req.body.clientId,
    serviceId: req.body.serviceId,
    booking_date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    booking_status: req.body.status,
    treatmentId: req.body.treatmentId || undefined,
    createdAt: req.body.createdAt || new Date(),
    updatedAt: req.body.updatedAt || new Date(),
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

export default bookingsRouter;

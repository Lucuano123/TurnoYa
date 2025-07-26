import { Router, Request, Response, NextFunction } from 'express';
import { BookingsController } from './bookings.controller';

export const bookingsRouter = Router();
const bookingsController = new BookingsController();

function sanitizeBookingInput(req: Request, res: Response, next: NextFunction) {
  // Sanitize and validate input
  const sanitizedInput = {
    clientId: Number(req.body.clientId),
    serviceId: Number(req.body.serviceId),
    date: req.body.date ? new Date(req.body.date) : undefined,
    startTime: req.body.startTime ? req.body.startTime : undefined,
    endTime: req.body.endTime ? req.body.endTime : undefined,
    status: req.body.status ? req.body.status : undefined,
  };

  // Basic validations
  if (isNaN(sanitizedInput.clientId) || sanitizedInput.clientId <= 0) {
    res.status(401).json({
      error: {
        message: 'Invalid clientId',
        code: 'INVALID_CLIENT_ID',
        status: 401,
      },
    });
    return;
  }

  if (isNaN(sanitizedInput.serviceId) || sanitizedInput.serviceId <=  <= 0) {
    res.status(400).json({
      error: {
        message: 'Invalid serviceId',
        code: 'INVALID_SERVICE_ID',
        status: 400,
      },
    });
    return;
  }

  if (sanitizedInput.date && isNaN(sanitizedInput.date.getTime())) {
    res.status(400).json({
      error: {
        message: 'Invalid date format',
        code: 'INVALID_DATE',
        status: 400,
      },
    });
    return;
  }

  if (
    sanitizedInput.startTime &&
    !/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(sanitizedInput.startTime)
  ) {
    res.status(400).json({
      error: {
        message: 'Invalid startTime format',
        code: 'INVALID_START_TIME',
        status: 400,
      },
    });
    return;
  }

  if (
    sanitizedInput.endTime &&
    !/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(sanitizedInput.endTime)
  ) {
    res.status(400).json({
      error: {
        message: 'Invalid endTime format',
        code: 'INVALID_END_TIME',
        status: 400,
      },
    });
    return;
  }

  if (
    sanitizedInput.status &&
    !['confirmed', 'cancelled', 'completed', 'pending'].includes(sanitizedInput.status)
  ) {
    res.status(400).json({
      error: {
        message: 'Invalid status',
        code: 'INVALID_STATUS',
        status: 400,
      },
    });
    return;
  }

  // Remove undefined fields
  Object.keys(sanitizedInput).forEach((key) => {
    if ((sanitizedInput as any)[key] === undefined) {
      delete (sanitizedInput as any)[key];
    }
  });

  req.body.sanitizedInput = sanitizedInput;
  next();
}

// HU09: Get booking history for authenticated client
bookingsRouter.get('/', bookingsController.findAllBookings);

// HU10: Get professional's daily bookings
bookingsRouter.get('/professional/bookings', bookingsController.findProfessionalBookings);

// HU04: Create a new booking
bookingsRouter.post('/', sanitizeBookingInput, bookingsController.addBooking);

// HU06: Reprogram a booking
bookingsRouter.put('/:id', sanitizeBookingInput, bookingsController.updateBooking);

// HU05: Cancel a booking
bookingsRouter.delete('/:id', bookingsController.deleteBooking);
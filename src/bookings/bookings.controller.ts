import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BookingsPostgresRepository } from './bookings.postgres.repository.js';
import { Booking } from './bookings.entity.js';
import { BookingsService } from './bookings.service.js';
import crypto from 'node:crypto';

export class BookingsController {
  private bookingsService: BookingsService;
  constructor() {
    const repository = new BookingsPostgresRepository();
    this.bookingsService = new BookingsService(repository);
  }

  // HU10: Obtener reservas siendo profesional
  getProfessionalBookings: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const date = req.query.date as string || new Date().toISOString().split('T')[0];

    try {
      if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        res.status(400).json({
          error: {
            message: 'Formato de fecha inválido. Use YYYY-MM-DD',
            code: 'INVALID_DATE_FORMAT',
            status: 400,
          },
        });
        return;
      }

      const bookings = await this.bookingsService.getProfessionalBookings(date);

      res.status(200).json({ data: bookings || [] });
    } catch (error) {
      console.error('Error in getProfessionalBookings:', error);
      res.status(500).json({
        error: {
          message: 'Error al obtener reservas',
          code: 'INTERNAL_SERVER_ERROR',
          status: 500,
        },
      });
      return;
    }
  };

  //HU03
  addBookings = async (req: Request, res: Response) => {
    try {
      const input = req.body.sanitizedInput || req.body;
      console.log("Datos recibidos:", input);

      const newBooking = new Booking(
        input.id,
        input.client_id,
        input.service_id,
        new Date(input.booking_date),
        input.start_time,
        input.end_time,
        input.booking_status,
        input.treatment_id || crypto.randomUUID(),
        input.created_at || new Date(),
        input.updated_at || new Date()
      );

      console.log("Booking creado:", newBooking);

      const savedBooking = await this.bookingsService.addBookings(newBooking);
      res.status(201).json({ data: savedBooking });
    } catch (error) {
      console.error("Error detallado:", error);

      let errorMessage = 'Error al crear la reserva';
      let errorDetails = 'Ocurrió un error inesperado';

      if (error instanceof Error) {
        errorMessage = error.message;
        errorDetails = error.stack || 'No hay stack trace disponible';
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }

      res.status(500).json({
        error: {
          message: errorMessage,
          code: 'INTERNAL_SERVER_ERROR',
          details: errorDetails,
          status: 500,
        },
      });
    }
  };
  async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      console.log('[BookingsController] getAllBookings');
      const bookings = await this.bookingsService.getAllBookings();
      res.status(200).json({ data: bookings });
    } catch (error) {
      console.error('[BookingsController] Error en getAllBookings:', error);
      res.status(500).json({
        error: {
          message: 'Error al obtener todas las reservas',
          code: 'SERVER_ERROR',
          status: 500,
        },
      });
    }
  }

  async getBookingById(req: Request, res: Response): Promise<void> {
    try {
      console.log('[BookingsController] getBookingById');
      const { id } = req.params;
      const booking = await this.bookingsService.getBookingById(parseInt(id));
      res.status(200).json({ data: booking });
    }
    catch (error) {
      console.error('[BookingsController] Error en getBookingById:', error);
      res.status(500).json({
        error: {
          message: 'Error al obtener reserva por ID',
          code: 'SERVER_ERROR',
          status: 500,
        },
      });
    }
  }
}

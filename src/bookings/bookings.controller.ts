import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BookingsPostgresRepository } from './bookings.postgres.repository.js';
import { Booking } from './bookings.entity';

export class BookingsController {
  private readonly bookingsRepository: BookingsPostgresRepository;

  constructor() {
    this.bookingsRepository = new BookingsPostgresRepository();
  }

  // HU10: Obtener reservas siendo profesional
  getProfessionalBookings: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const date = req.query.date as string || new Date().toISOString().split('T')[0];

    try {
      // Validar formato de fecha (ISO 8601: YYYY-MM-DD)
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

      // Consultar reservas desde el repositorio
      const bookings = await this.bookingsRepository.findByDate(new Date(date));

      // Devolver array vacío si no hay reservas
      res.status(200).json({ data: bookings || [] });
    } catch (error) {
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
}

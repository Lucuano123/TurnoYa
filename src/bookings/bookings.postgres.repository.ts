import { Booking } from './bookings.entity.js';
import { BookingsRepository } from './bookings.repository.interface.js';
import { pool } from '../config/database.config.js';

export class BookingsPostgresRepository implements BookingsRepository {

  async add(booking: Booking): Promise<Booking> {
    try {
      const res = await pool.query(
        `INSERT INTO bookings ("clientId", "serviceId", "date", "startTime", "endTime", "status", "treatment_id", "created_at", "updated_at")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          booking.clientId,
          booking.serviceId,
          booking.date.toISOString().split('T')[0], // Formato YYYY-MM-DD
          booking.startTime,
          booking.endTime,
          booking.status,
          booking.treatment_id,
          booking.created_at,
          booking.updated_at
        ]
      );
      
      const newBooking = res.rows[0];
      return new Booking(
        newBooking.id,
        newBooking.clientId,
        newBooking.serviceId,
        newBooking.date,
        newBooking.startTime,
        newBooking.endTime,
        newBooking.status,
        newBooking.treatment_id,
        newBooking.created_at,
        newBooking.updated_at
      );
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  }

// Método faltante para obtener las reservas del profesional
  async getProfessionalBookings(date: string): Promise<Booking[]> {
    try {
      const res = await pool.query(
        `SELECT * FROM bookings WHERE date = $1`,
        [date]
      );
      return res.rows.map(row => new Booking(
        row.id,
        row.clientId,
        row.serviceId,
        row.date,
        row.startTime,
        row.endTime,
        row.status,
        row.treatment_id,
        row.created_at,
        row.updated_at
      ));
    } catch (error) {
      console.error('Error getting professional bookings:', error);
      throw error;
    }
  }
}

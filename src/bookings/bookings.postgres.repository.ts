import { Booking } from './bookings.entity.js';
import { BookingsRepository } from './bookings.repository.interface.js';
import { pool } from '../config/database.config.js';

export class BookingsPostgresRepository implements BookingsRepository {

  async add(booking: Booking): Promise<Booking> {
    try {
      const res = await pool.query(
        `INSERT INTO bookings (
          client_id, 
          service_id, 
          booking_date, 
          start_time, 
          end_time, 
          booking_status, 
          treatment_id, 
          created_at, 
          updated_at
        )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          booking.client_id,
          booking.service_id,
          booking.booking_date, // ya debería venir como Date o string YYYY-MM-DD
          booking.start_time,
          booking.end_time,
          booking.booking_status,
          booking.treatment_id,
          booking.created_at,
          booking.updated_at
        ]
      );
      
      const newBooking = res.rows[0];
      return new Booking(
        newBooking.id,
        newBooking.client_id,
        newBooking.service_id,
        newBooking.booking_date,
        newBooking.start_time,
        newBooking.end_time,
        newBooking.booking_status,
        newBooking.treatment_id,
        newBooking.created_at,
        newBooking.updated_at
      );
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  }

  // HU10 para obtener las reservas del profesional
  async getProfessionalBookings(date: string): Promise<Booking[]> {
    try {
      const res = await pool.query(
        `SELECT * FROM bookings WHERE booking_date = $1`,
        [date]
      );
      return res.rows.map(row => new Booking(
        row.id,
        row.client_id,
        row.service_id,
        row.booking_date,
        row.start_time,
        row.end_time,
        row.booking_status,
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

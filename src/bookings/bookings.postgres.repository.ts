import { Booking } from './bookings.entity.js';
import { BookingsRepository } from './bookings.repository.interface.js';
import { pool } from '../config/database.config.js';

export class BookingsPostgresRepository implements BookingsRepository {

  async add(booking: Booking): Promise<Booking> {
  try {
    const res = await pool.query(
      `INSERT INTO service (clientId, serviceId, date, startTime, endTime, status, treatmentId, createdAt, updatedAt)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        booking.clientId,
        booking.serviceId,
        booking.date,
        booking.startTime,
        booking.endTime,
        booking.status
      ]
    );
    return res.rows[0]; // ✅ solo retornamos si todo fue bien
  } catch (error) {
    console.error('Error adding service:', error);
    throw error; // ❗ lanzamos el error o manejalo como prefieras
  }
}

}

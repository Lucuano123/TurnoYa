import { Client } from 'pg';
import { Booking } from './bookings.entity.js';
import { BookingsRepository } from './bookings.repository.interface.js';

const client = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'turnero',
  password: process.env.DB_PASSWORD || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
});

export class BookingsPostgresRepository implements BookingsRepository {
  constructor() {
    client.connect();
  }
  findAll(params: { clientId: number; status?: string; dateFrom?: Date; dateTo?: Date; }): Promise<Booking[] | undefined> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<Booking | undefined> {
    throw new Error('Method not implemented.');
  }
  add(booking: Booking): Promise<Booking | undefined> {
    throw new Error('Method not implemented.');
  }
  update(id: number, booking: Booking): Promise<Booking | undefined> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<Booking | undefined> {
    throw new Error('Method not implemented.');
  }
  checkAvailability(serviceId: number, date: Date, startTime: string, excludeBookingId?: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findByDate(date: Date): Promise<Booking[] | undefined> {
    try {
      const query = `
        SELECT 
          id,
          client_id AS clientId,
          service_id AS serviceId,
          date,
          start_time AS startTime,
          end_time AS endTime,
          status,
          treatment_id AS treatmentId,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM bookings
        WHERE date = $1
        ORDER BY start_time
      `;
      const res = await client.query(query, [date]);
      return res.rows.map(
        (row) =>
          new Booking(
            row.id,
            row.clientid,
            row.serviceid,
            new Date(row.date),
            row.starttime,
            row.endtime,
            row.status,
            row.treatmentid,
            new Date(row.createdat),
            new Date(row.updatedat),
          ),
      );
    } catch (error) {
      console.error('Error finding bookings by date:', error);
      throw error;
    }
  }
}
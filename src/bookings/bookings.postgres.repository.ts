// Repositorio PostgreSQL
import { Client } from 'pg';
import { Booking } from './bookings.entity';
import { BookingsRepository } from './bookings.repository.interface';

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

  async findAll({
    clientId,
    status,
    dateFrom,
    dateTo,
  }: {
    clientId: number;
    status?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<Booking[] | undefined> {
    try {
      let query = 'SELECT * FROM bookings WHERE clientId = $1';
      const values: any[] = [clientId];
      let paramIndex = 2;

      if (status) {
        query += ` AND status = $${paramIndex}`;
        values.push(status);
        paramIndex++;
      }

      if (dateFrom) {
        query += ` AND date >= $${paramIndex}`;
        values.push(dateFrom);
        paramIndex++;
      }

      if (dateTo) {
        query += ` AND date <= $${paramIndex}`;
        values.push(dateTo);
        paramIndex++;
      }

      const res = await client.query(query, values);
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
      console.error('Error finding bookings:', error);
      return undefined;
    }
  }

  async findByDate(date: Date): Promise<Booking[] | undefined> {
    try {
      const query = 'SELECT * FROM bookings WHERE date = $1';
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
      return undefined;
    }
  }

  async findOne(id: number): Promise<Booking | undefined> {
    try {
      const res = await client.query('SELECT * FROM bookings WHERE id = $1', [id]);
      if (res.rows.length === 0) {
        return undefined;
      }
      const row = res.rows[0];
      return new Booking(
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
      );
    } catch (error) {
      console.error('Error finding booking:', error);
      return undefined;
    }
  }

  async add(booking: Booking): Promise<Booking | undefined> {
    try {
      const query = `
        INSERT INTO bookings (clientId, serviceId, date, startTime, endTime, status, treatmentId, createdAt, updatedAt)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;
      const values = [
        booking.clientId,
        booking.serviceId,
        booking.date,
        booking.startTime,
        booking.endTime,
        booking.status,
        booking.treatmentId,
        booking.createdAt,
        booking.updatedAt,
      ];
      const res = await client.query(query, values);
      const row = res.rows[0];
      return new Booking(
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
      );
    } catch (error) {
      console.error('Error adding booking:', error);
      return undefined;
    }
  }

  async update(id: number, booking: Booking): Promise<Booking | undefined> {
    try {
      const query = `
        UPDATE bookings
        SET clientId = $1, serviceId = $2, date = $3, startTime = $4, endTime = $5, status = $6, updatedAt = $7
        WHERE id = $8
        RETURNING *
      `;
      const values = [
        booking.clientId,
        booking.serviceId,
        booking.date,
        booking.startTime,
        booking.endTime,
        booking.status,
        booking.updatedAt,
        id,
      ];
      const res = await client.query(query, values);
      if (res.rows.length === 0) {
        return undefined;
      }
      const row = res.rows[0];
      return new Booking(
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
      );
    } catch (error) {
      console.error('Error updating booking:', error);
      return undefined;
    }
  }

  async delete(id: number): Promise<Booking | undefined> {
    try {
      const res = await client.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
      if (res.rows.length === 0) {
        return undefined;
      }
      const row = res.rows[0];
      return new Booking(
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
      );
    } catch (error) {
      console.error('Error deleting booking:', error);
      return undefined;
    }
  }

  async checkAvailability(
    serviceId: number,
    date: Date,
    startTime: string,
    excludeBookingId?: number,
  ): Promise<boolean> {
    try {
      // Check if the slot is within an available time for the service
      const availabilityQuery = `
        SELECT * FROM availabilities
        WHERE serviceId = $1
        AND date = $2
        AND startTime <= $3
        AND endTime >= $4
      `;
      const availabilityValues = [serviceId, date, startTime, startTime];
      const availabilityResult = await client.query(availabilityQuery, availabilityValues);

      if (availabilityResult.rows.length === 0) {
        return false; // No available slot for this service, date, and time
      }

      // Check for conflicting bookings
      let conflictQuery = `
        SELECT * FROM bookings
        WHERE serviceId = $1
        AND date = $2
        AND startTime = $3
        AND status != 'cancelled'
      `;
      const conflictValues: any[] = [serviceId, date, startTime];

      if (excludeBookingId) {
        conflictQuery += ` AND id != $${conflictValues.length + 1}`;
        conflictValues.push(excludeBookingId);
      }

      const conflictResult = await client.query(conflictQuery, conflictValues);
      return conflictResult.rows.length === 0; // True if no conflicts
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  }
}
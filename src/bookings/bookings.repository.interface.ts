// Interfaz del repositorio
import { Booking } from './bookings.entity.js';

export interface BookingsRepository {
  findAll(params: {
    clientId: number;
    status?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<Booking[] | undefined>;
  findByDate(date: Date): Promise<Booking[] | undefined>;
  findOne(id: number): Promise<Booking | undefined>;
  add(booking: Booking): Promise<Booking | undefined>;
  update(id: number, booking: Booking): Promise<Booking | undefined>;
  delete(id: number): Promise<Booking | undefined>;
  checkAvailability(
    serviceId: number,
    date: Date,
    startTime: string,
    excludeBookingId?: number,
  ): Promise<boolean>;
}
// Interfaz del repositorio
import { Booking } from './bookings.entity.js';

export interface BookingsRepository {

  add(booking: Booking): Promise<Booking | undefined>;

}
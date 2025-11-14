import { BookingsPostgresRepository } from './bookings.postgres.repository.js';
import { Booking } from './bookings.entity.js';

export class BookingsService {
    constructor(private bookingsRepository: BookingsPostgresRepository) { }

    async getProfessionalBookings(date?: string): Promise<Booking[]> {
        try {
            return await this.bookingsRepository.findAll();
        } catch (error) {
            console.error('[BookingsService] Error al obtener reservas del profesional:', error);
            throw error;
        }
    }


    async addBookings(newBooking: Booking): Promise<Booking> {
        try {
            return await this.bookingsRepository.add(newBooking);
        } catch (error) {
            console.error('[BookingsService] Error al agregar la reserva:', error);
            throw error;
        }
    }


    async getAllBookings(): Promise<Booking[]> {
        try {
            return await this.bookingsRepository.findAll();
        } catch (error) {
            console.error('[BookingsService] Error al obtener reservas:', error);
            throw error;
        }
    }

    async getBookingById(id: number): Promise<Booking | null> {
        try {
            const booking = await this.bookingsRepository.findById(id);
            return booking || null;
        } catch (error) {
            console.error('[BookingsService] Error al obtener reserva por ID:', error);
            throw error;
        }
    }
    async deleteBooking(id: number): Promise<void> {
        try {
            const existing = await this.bookingsRepository.findById(id);

            if (!existing) {
                throw new Error('BOOKING_NOT_FOUND');
            }

            await this.bookingsRepository.delete(id);
        } catch (error) {
            console.error('[BookingsService] Error al eliminar la reserva:', error);
            throw error;
        }
    }
    async updateBooking(id: number, updatedBooking: Booking): Promise<Booking | null> {
        try {
            const existing = await this.bookingsRepository.findById(id);

            if (!existing) {
                throw new Error('BOOKING_NOT_FOUND');
            }

            return await this.bookingsRepository.update(id, updatedBooking);
        } catch (error) {
            console.error('[BookingsService] Error al actualizar reserva:', error);
            throw error;
        }
    }

}

// Entidad TypeScript para bookings
import crypto from 'node:crypto';

export class Booking {
  constructor(
    public id: number,
    public clientId: number,
    public serviceId: number,
    public date: Date,
    public startTime: string,
    public endTime: string,
    public status: 'confirmed' | 'cancelled' | 'completed' | 'pending',
    public treatmentId: string = crypto.randomUUID(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}

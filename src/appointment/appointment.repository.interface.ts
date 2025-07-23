import { Appointment } from "./appointment.entity.js";

export interface AppointmentRepository {
    findAll(): Promise<Appointment[] | undefined>;
    findOne(id: string): Promise<Appointment | undefined>;
    add(Appointment: Appointment): Promise<Appointment | undefined>;
    update(id: string, Appointment: Appointment): Promise<Appointment | undefined>;
    partialUpdate(id: string, updates: Partial<Appointment>): Promise<Appointment | undefined>;
    delete(id: string): Promise<Appointment | undefined>;
}
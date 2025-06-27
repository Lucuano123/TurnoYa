import { Request, Response } from 'express';
import { Appointment } from './appointment.entity.js';
import { AppointmentMongoRepository } from './appointment.mongodb.repository.js';


const appointmentRepository = new AppointmentMongoRepository();
//const appointmentRepository = new AppointmentPostgresRepository();

export class AppointmentController {

    async findAllAppointments(req: Request, res: Response) {
        const Appointments = await appointmentRepository.findAll();
        res.json(Appointments);
    }

    async findAppointmentById(req: Request, res: Response) {
        const AppointmentId = req.params.id;
        const Appointment = await appointmentRepository.findOne(AppointmentId);
        if (!Appointment) {
            res.status(404).json({
                errorMessage: 'Appointment not found',
                errorCode: 'Appointment_NOT_FOUND'
            });
            return;
        }
        res.json({ data: Appointment });
    }

    async addAppointment(req: Request, res: Response) {

        const input = req.body;
        const newAppointment = new Appointment(
            new Date(input.date),
            input.time,
            input.custumer_name,
            input.custumer_email,
            input.booked_service,
            input.status || 'scheduled' // Default status to 'scheduled' if not provided
        );

        await appointmentRepository.add(newAppointment);

        res.status(201).json({ data: newAppointment });

    }

    updateAppointment(req: Request, res: Response) {
        // Logic to update an existing Appointment
        const AppointmentId = req.params.id;
        const input = req.body;
    }

    deleteAppointment(req: Request, res: Response) {
        // Logic to delete a appointment
        const AppointmentId = req.params.id;
        appointmentRepository.delete(AppointmentId)
        res.status(201).json({
                message: "Appointment deleted successfully"
            });
    }




}
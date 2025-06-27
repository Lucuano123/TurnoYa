import { Router } from "express";
import { AppointmentController } from './appointment.controller.js';

export const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.get('/', appointmentController.findAllAppointments);
appointmentRouter.get('/:id', appointmentController.findAppointmentById);
appointmentRouter.post('/', sanitizeAppointmentInput, appointmentController.addAppointment);
appointmentRouter.put('/:id', sanitizeAppointmentInput, appointmentController.updateAppointment);
appointmentRouter.delete('/:id', appointmentController.deleteAppointment);  

function sanitizeAppointmentInput(req:any, res:any, next:any) {

  req.body.sanitizedInput = {
    date: req.body.date,
    time: req.body.time,
    custumer_name: req.body.custumer_name,
    custumer_email: req.body.custumer_email,
    booked_service: req.body.booked_service,
    status: req.body.status
  }


  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}


import express from 'express';
import { customerRouter } from './custumer/customer.routes.js';
import { appointmentRouter } from './appointment/appointment.routes.js';

const app = express();

app.use(express.json())

app.use('/api/customers', customerRouter);
app.use('/api/appointments', appointmentRouter);

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})

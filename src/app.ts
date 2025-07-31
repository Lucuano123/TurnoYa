import express from 'express';
import { customerRouter } from './customers/customers.routes.js';
import { bookingsRouter } from './bookings/bookings.routes.js';
import { setupRouter } from './setup/setup.routes.js';

const app = express();

app.use(express.json())

app.use('/api/customers', customerRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/setup', setupRouter);

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})

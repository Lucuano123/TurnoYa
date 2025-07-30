-- migrations/bookings.sql
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  birth_date DATE,
  role VARCHAR(20) NOT NULL DEFAULT 'client',
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES customers(id),
  service_id INTEGER NOT NULL REFERENCES services(id),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('confirmed', 'cancelled', 'completed', 'pending')),
  treatment_id UUID UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_treatment_id ON bookings(treatment_id);
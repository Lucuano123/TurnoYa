-- Crear tabla payments
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER NOT NULL UNIQUE REFERENCES bookings(id),
  client_id INTEGER NOT NULL REFERENCES customers(id),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  payment_method VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Eliminar índice si existe
DROP INDEX IF EXISTS idx_payments_booking_id;

-- Crear índice
CREATE INDEX idx_payments_booking_id ON payments(booking_id);

-- Insertar datos de prueba con IDs explícitos
INSERT INTO payments (id, booking_id, client_id, amount, status, payment_method, transaction_id) VALUES
  (1, 1, 1, 50.00, 'completed', 'credit_card', 'txn_001'),
  (2, 2, 2, 75.00, 'pending', 'transfer', NULL),
  (3, 3, 1, 100.00, 'completed', 'credit_card', 'txn_002');
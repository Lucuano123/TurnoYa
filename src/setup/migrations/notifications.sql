-- Crear tabla notifications
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES customers(id),
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('email', 'push', 'sms')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Limpiar las tablas y reiniciar las secuencias
TRUNCATE TABLE notifications RESTART IDENTITY CASCADE;

-- Insertar datos de prueba
INSERT INTO notifications (user_id, message, type, status) VALUES
  (1, 'Reserva confirmada para Consulta General', 'email', 'sent'),
  (2, 'Su reserva está pendiente de pago', 'sms', 'pending'),
  (1, 'Recordatorio: Cita mañana a las 10:00', 'push', 'sent');
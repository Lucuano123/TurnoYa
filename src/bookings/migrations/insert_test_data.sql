-- migrations/insert_test_data.sql
BEGIN;

-- Limpiar las tablas y reiniciar las secuencias
TRUNCATE TABLE bookings, services, customers RESTART IDENTITY CASCADE;

-- Insertar clientes
INSERT INTO customers (email, name, password, phone, birth_date, role, status)
VALUES 
  ('client1@example.com', 'Ana López', 'hashed-password', '123456789', '1990-01-01', 'client', 'approved'),
  ('client2@example.com', 'Juan Pérez', 'hashed-password', '987654321', '1985-05-10', 'client', 'approved'),
  ('client3@example.com', 'María Gómez', 'hashed-password', '555123456', '1995-03-15', 'client', 'approved'),
  ('pro@example.com', 'Lucía Fernández', 'hashed-password', '555789123', '1980-07-20', 'professional', 'approved');

-- Insertar servicios de peluquería
INSERT INTO services (name, description, duration, price, category_id)
VALUES 
  ('Corte de cabello', 'Corte de cabello para hombres o mujeres', 30, 25.00, NULL),
  ('Tinte', 'Aplicación de tinte permanente o semipermanente', 90, 60.00, NULL),
  ('Peinado', 'Peinado para eventos o diario', 45, 35.00, NULL),
  ('Manicura', 'Corte, limado y esmaltado de uñas', 60, 20.00, NULL),
  ('Alisado', 'Tratamiento de alisado permanente', 120, 80.00, NULL);

-- Insertar reservas
INSERT INTO bookings (client_id, service_id, date, start_time, end_time, status, treatment_id)
VALUES 
  (1, 1, '2025-07-27', '10:00:00', '10:30:00', 'confirmed', '550e8400-e29b-41d4-a716-446655440000'),
  (2, 2, '2025-07-27', '11:00:00', '12:30:00', 'confirmed', '550e8400-e29b-41d4-a716-446655440001'),
  (3, 3, '2025-07-27', '14:00:00', '14:45:00', 'pending', '550e8400-e29b-41d4-a716-446655440002'),
  (1, 4, '2025-07-28', '09:00:00', '10:00:00', 'confirmed', '550e8400-e29b-41d4-a716-446655440003'),
  (2, 5, '2025-07-28', '15:00:00', '17:00:00', 'completed', '550e8400-e29b-41d4-a716-446655440004');

COMMIT;
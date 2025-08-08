-- Crear tabla bookings
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  "clientId" INTEGER NOT NULL REFERENCES customers(id),
  "serviceId" INTEGER NOT NULL REFERENCES services(id),
  "date" DATE NOT NULL,
  "startTime" TIME NOT NULL,
  "endTime" TIME NOT NULL,
  "status" VARCHAR(20) NOT NULL CHECK ("status" IN ('confirmed', 'cancelled', 'completed', 'pending')),
  "treatment_id" UUID UNIQUE DEFAULT gen_random_uuid(),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Eliminar índices si existen
DROP INDEX IF EXISTS idx_bookings_date;
DROP INDEX IF EXISTS idx_bookings_treatment_id;

-- Crear índices
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_treatment_id ON bookings(treatment_id);

-- Insertar datos de prueba con IDs explícitos
INSERT INTO bookings (id, clientId, serviceId, date, startTime, endTime, status, treatment_id) VALUES
  (1, 1, 1, '2025-08-01', '09:00', '09:30', 'confirmed', gen_random_uuid()),
  (2, 2, 2, '2025-08-01', '14:00', '14:45', 'pending', gen_random_uuid()),
  (3, 1, 3, '2025-08-02', '10:00', '11:00', 'confirmed', gen_random_uuid());
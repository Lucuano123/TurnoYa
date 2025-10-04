-- Crear tabla availabilities
CREATE TABLE IF NOT EXISTS availabilities (
  id SERIAL PRIMARY KEY,
  service_id INTEGER NOT NULL REFERENCES services(id),
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  specific_date DATE,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  interval INTEGER NOT NULL,
  is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_date_check CHECK (
    (is_recurring = TRUE AND specific_date IS NULL) OR 
    (is_recurring = FALSE AND specific_date IS NOT NULL)
  )
);

-- Limpiar indices
DROP INDEX IF EXISTS idx_availabilities_service_id;

-- Crear índice
CREATE INDEX IF NOT EXISTS idx_availabilities_service_id ON availabilities(service_id);

-- Limpiar las tablas y reiniciar las secuencias
TRUNCATE TABLE availabilities RESTART IDENTITY CASCADE;

-- Insertar datos de prueba
INSERT INTO availabilities (service_id, day_of_week, specific_date, start_time, end_time, interval, is_recurring) VALUES
  (1, 1, NULL, '09:00', '12:00', 30, TRUE),
  (2, NULL, '2025-08-01', '14:00', '17:00', 45, FALSE),
  (3, 3, NULL, '10:00', '13:00', 60, TRUE);
-- Crear tabla categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT INTO categories (id, name, description) VALUES
  (1, 'Peluquería', 'Servicios de cuidado capilar y estilismo'),
  (2, 'Estética', 'Servicios de cuidado personal y belleza'),
  (3, 'Nutrición', 'Servicios de planificación dietética');
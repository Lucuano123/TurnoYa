-- Crear tabla categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Limpiar las tablas y reiniciar las secuencias  
TRUNCATE TABLE categories RESTART IDENTITY CASCADE;
-- Insertar datos de prueba
INSERT INTO categories (id, name, description) VALUES
  (1, 'Categoría 1', 'Descripción de la categoría 1'),
  (2, 'Categoría 2', 'Descripción de la categoría 2'),
  (3, 'Categoría 3', 'Descripción de la categoría 3');

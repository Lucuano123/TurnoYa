-- Crear tabla customers
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  birth_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  role VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'professional')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Eliminar índice si existe
DROP INDEX IF EXISTS idx_customers_email;

-- Crear índice
CREATE INDEX idx_customers_email ON customers(email);

-- Insertar datos de prueba
INSERT INTO customers (id, email, first_name, last_name, password, phone, birth_date, status, role) VALUES
  (1, 'juan.perez@example.com', 'Juan', 'Perez', '$2b$10$X1Y2Z3W4V5U6T7S8R9Q0P.', '1234567890', '1990-05-15', 'approved', 'customer'),
  (2, 'ana.gomez@example.com', 'Ana', 'Gomez', '$2b$10$A1B2C3D4E5F6G7H8I9J0K.', '9876543210', '1985-08-22', 'pending', 'customer'),
  (3, 'profesional@example.com', 'Dr. Maria', 'Lopez', '$2b$10$L1M2N3O4P5Q6R7S8T9U0V.', '5551234567', '1975-03-10', 'approved', 'professional');
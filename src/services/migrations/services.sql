-- Crear tabla services
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  image_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insertar servicios de peluquería
INSERT INTO services (id, name, description, duration, price, category_id) VALUES
  (1, 'Corte de cabello', 'Corte de cabello para hombres o mujeres', 30, 25.00, 1),
  (2, 'Tinte', 'Aplicación de tinte permanente o semipermanente', 90, 60.00, 1),
  (3, 'Peinado', 'Peinado para eventos o diario', 45, 35.00, 1),
  (4, 'Manicura', 'Corte, limado y esmaltado de uñas', 60, 20.00, 2),
  (5, 'Alisado', 'Tratamiento de alisado permanente', 120, 80.00, 1);
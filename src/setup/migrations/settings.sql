-- Crear tabla settings
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Limpiar la tabla settings y reiniciar la secuencia
TRUNCATE TABLE settings RESTART IDENTITY CASCADE;

-- Insertar datos de configuración inicial
INSERT INTO settings (key, value) VALUES
    ('site_name', 'turnero'),
    ('site_url', 'https://turnero.com'),
    ('contact_email', 'turnero@turnero.com');




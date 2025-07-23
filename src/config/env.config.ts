// Manejo de variables de entorno (dotenv)
export const envConfig = {
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  // otras variables...
};
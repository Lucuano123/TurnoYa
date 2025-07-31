import * as dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

export const envConfig = {
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  PORT: Number(process.env.PORT) || 3000,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'turnero',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
};
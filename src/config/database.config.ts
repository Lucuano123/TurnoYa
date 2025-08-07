// src/config/database.config.ts
import { Pool } from 'pg';
import { envConfig } from './env.config.js';

export const databaseConfig = {
  user: envConfig.DB_USER,
  host: envConfig.DB_HOST,
  database: envConfig.DB_NAME,
  password: envConfig.DB_PASSWORD,
  port: envConfig.DB_PORT,
};

export const pool = new Pool(databaseConfig);

// Función reutilizable para queries simples
export const query = (text: string, params?: any[]) => pool.query(text, params);
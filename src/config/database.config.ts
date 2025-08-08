// src/config/database.config.ts
import { Pool } from 'pg';
import { envConfig } from './env.config.js';
//import { Pool } from 'pg';

export const databaseConfig = {
  user: envConfig.DB_USER,
  host: envConfig.DB_HOST,
  database: envConfig.DB_NAME,
  password: envConfig.DB_PASSWORD,
  port: envConfig.DB_PORT,
};

console.log('[DB CONFIG]', {
  user: envConfig.DB_USER,
  host: envConfig.DB_HOST,
  database: envConfig.DB_NAME,
  password: envConfig.DB_PASSWORD,
  port: envConfig.DB_PORT,
});

export const pool = new Pool(databaseConfig);
export const query = async (text: string, params?: any[]) => pool.query(text, params);
export const connect = async () => pool.connect();

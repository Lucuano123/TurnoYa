import pkg from 'pg';
const { Pool } = pkg;

import { envConfig } from './env.config.js';

export const databaseConfig = {
  user: envConfig.DB_USER,
  host: envConfig.DB_HOST,
  database: envConfig.DB_NAME,
  password: envConfig.DB_PASSWORD,
  port: envConfig.DB_PORT,
  ssl: envConfig.DB_SSL ? { rejectUnauthorized: false } : false,
};

console.log('[DB CONFIG]', databaseConfig);

export const pool = new Pool(databaseConfig);
export const query = async (text: string, params?: any[]) => pool.query(text, params);
export const connect = async () => pool.connect();

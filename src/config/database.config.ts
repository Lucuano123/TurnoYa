import { envConfig } from './env.config.js';

export const databaseConfig = {
  user: envConfig.DB_USER,
  host: envConfig.DB_HOST,
  database: envConfig.DB_NAME,
  password: envConfig.DB_PASSWORD,
  port: envConfig.DB_PORT,
};
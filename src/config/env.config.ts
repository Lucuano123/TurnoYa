import * as dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  PORT: Number(process.env.PORT) || 3000,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || 'postgres',
  DB_SSL: process.env.DB_SSL === 'true',
};

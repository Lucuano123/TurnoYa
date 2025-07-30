import { Request, Response } from 'express';
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../'); // Apunta a la raíz del proyecto (TurnoYa)

export class SetupController {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'turnero',
      password: process.env.DB_PASSWORD || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
    });
  }

  async setupDatabase(req: Request, res: Response): Promise<void> {
    try {
      // Conectar al cliente PostgreSQL
      await this.client.connect();

      // Leer y ejecutar bookings.sql
      const bookingsSql = fs.readFileSync(
        path.join(projectRoot, 'src/bookings/migrations/bookings.sql'),
        'utf-8'
      );
      await this.client.query(bookingsSql);

      // Leer y ejecutar insert_test_data.sql
      const testDataSql = fs.readFileSync(
        path.join(projectRoot, 'src/bookings/migrations/insert_test_data.sql'),
        'utf-8'
      );
      await this.client.query(testDataSql);

      // Desconectar
      await this.client.end();

      res.status(200).json({ message: 'Base de datos inicializada con éxito' });
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      res.status(500).json({
        error: {
          message: 'Error al ejecutar los scripts SQL',
          code: 'INTERNAL_SERVER_ERROR',
          status: 500,
        },
      });
    }
  }
}
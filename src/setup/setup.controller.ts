import { Request, Response } from 'express';
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { databaseConfig } from '../config/database.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../'); // Apunta a la raíz del proyecto (TurnoYa)

export class SetupController {
  private client: Client;

  constructor() {
    this.client = new Client(databaseConfig);
  }

  async setupDatabase(req: Request, res: Response): Promise<void> {
    try {
      // Conectar al cliente PostgreSQL
      await this.client.connect();

      // Ejecutar setup.sql para eliminar todas las tablas
      const setupSql = fs.readFileSync(
        path.join(projectRoot, 'src/setup/migrations/setup.sql'),
        'utf-8'
      );
      await this.client.query(setupSql);
      console.log('Tablas eliminadas: setup.sql');

      // Lista de migraciones en orden para crear tablas y datos
      const migrations = [
        'categories/migrations/categories.sql',
        'customers/migrations/customers.sql',
        'services/migrations/services.sql',
        'availabilities/migrations/availabilities.sql',
        'bookings/migrations/bookings.sql',
        'payments/migrations/payments.sql',
        'notifications/migrations/notifications.sql',
        'settings/migrations/settings.sql',
      ];

      // Ejecutar cada migración
      for (const migration of migrations) {
        const filePath = path.join(projectRoot, 'src', migration);
        const sql = fs.readFileSync(filePath, 'utf-8');
        await this.client.query(sql);
        console.log(`Migración ejecutada: ${migration}`);
      }

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
// Repositorio PostgreSQL
/*
import { Services } from './services.entity.js';
import { Pool } from 'pg';

export class ServicePostgresRepository {
  constructor(private pool: Pool) {}

  async getAll(): Promise<Services[]> {
    const res = await this.pool.query('SELECT * FROM services');
    return res.rows;
  }

  async getById(id: string): Promise<Services | null> {
    const res = await this.pool.query('SELECT * FROM services WHERE id = $1', [id]);
    return res.rows[0] || null;
  }
}*/
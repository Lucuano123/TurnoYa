import { pool } from '../config/database.config.js';
import { Customer } from './customers.entity.js';

export class CustomersPostgresRepository {
  async findById(id: number): Promise<Customer | null> {
    try {
      const query = 'SELECT * FROM customers WHERE id = $1';
      const { rows } = await pool.query<Customer>(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error('Error al obtener cliente por ID');
    }
  }

  async findAll(): Promise<Customer[]> {
    const query = `SELECT  id,
        first_name || ' ' || last_name AS name,
        email,
        phone,
        created_at,
        status 
        FROM customers 
        ORDER BY id`;
    try {
      const { rows } = await pool.query<Customer>(query);
      return rows;
    } catch (error) {
      throw new Error('Error al obtener todos los clientes');
    }
  }

  async updateStatus(id: number, status: 'approved' | 'rejected'): Promise<Customer> {
    try {
      const query = `
        UPDATE customers 
        SET status = $1, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $2 
        RETURNING *
      `;
      const { rows } = await pool.query<Customer>(query, [status, id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error al actualizar el estado del cliente');
    }
  }

  async findPendingUsers(): Promise<Customer[]> {
    try {
      const query = `
      SELECT 
        id,
        first_name || ' ' || last_name AS name,
        email,
        phone,
        created_at,
        status
      FROM customers
      WHERE status = 'pending'
      ORDER BY id`;
      const { rows } = await pool.query<Customer>(query);
      return rows;
    } catch (error) {
      throw new Error('Error al obtener usuarios pendientes');
    }
  }
}

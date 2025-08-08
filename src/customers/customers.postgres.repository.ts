import { pool } from '../config/database.config.js';
import { Customer } from './customers.entity.js';


export class CustomersPostgresRepository {
  async findById(id: number): Promise<Customer | null> {
    const query = 'SELECT * FROM customers WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }
  async findAll(): Promise<Customer[]> {
    try {
      const query = 'SELECT * FROM customers ORDER BY id';
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('[CustomersPostgresRepository] Error getting all customers:', error);
      throw {
        message: 'Error al obtener todos los clientes',
        code: 'DB_ERROR',
        status: 500,
      };
    }
  }
  async updateStatus(id: number, status: 'approved' | 'rejected'): Promise<Customer> {
    const query = `
      UPDATE customers 
      SET status = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 
      RETURNING *
    `;
    const { rows } = await pool.query(query, [status, id]);
    return rows[0];
  }
  async findPendingUsers(): Promise<Customer[]> {
    try {
      const query = `
      SELECT * FROM customers
      WHERE status = 'pending'
      ORDER BY id
    `;
      const { rows } = await pool.query(query);
      console.log('[Repository] Usuarios pendientes encontrados:', rows.length);
      return rows;
    } catch (error) {
      console.error('[Repository] Error en findPendingUsers:', error);
      throw {
        message: 'Error al obtener usuarios pendientes',
        code: 'DB_ERROR',
        status: 500,
      };
    }
  }

}

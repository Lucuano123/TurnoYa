import { pool } from '../config/database.config.js';
import { Customer } from './customers.entity.js';
import { CustomersService } from './customers.service.js';

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

  async create(data: Partial<Customer>): Promise<Customer> {
    try {
      const query = `
      INSERT INTO customers (
        first_name,
        last_name,
        email,
        password,
        phone,
        birth_date,
        status,
        role,
        created_at,
        updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING *
    `;

      const params = [
        data.first_name ?? null,
        data.last_name ?? null,
        data.email ?? null,
        data.password ?? null,
        data.phone ?? null,
        data.birth_date ?? null,
        data.status ?? 'pending',
        data.role ?? 'customer'
      ];

      const { rows } = await pool.query<Customer>(query, params);
      return rows[0];
    } catch (error) {
      console.error('[CustomersPostgresRepository] Error en create:', error);
      throw new Error('Error al crear cliente');
    }
  }

  async update(id: number, data: Partial<Customer>): Promise<Customer> {
  try {
    // 1) Verifico si el cliente existe
    const customer = await this.findById(id);
    if (!customer) {
      throw new Error('CUSTOMER_NOT_FOUND');
    }

    // 2) Validaciones de status/role
    const allowedStatus = ['pending', 'approved', 'rejected'];
    const allowedRoles = ['customer', 'professional'];

    if (data.status && !allowedStatus.includes(data.status)) {
      throw new Error(`INVALID_STATUS: ${data.status}`);
    }

    if (data.role && !allowedRoles.includes(data.role)) {
      throw new Error(`INVALID_ROLE: ${data.role}`);
    }

    // 3) Formateo de fecha si viene en ISO con "T"
    let birthDate = data.birth_date ?? customer.birth_date;

    if (typeof birthDate === 'string' && birthDate.includes('T')) {
      birthDate = birthDate.split('T')[0]; // yyyy-MM-dd
    }

    // 4) Merge final (data pisa a existing si viene definida)
    const merged: Partial<Customer> = {
      first_name: data.first_name ?? customer.first_name,
      last_name: data.last_name ?? customer.last_name,
      email: data.email ?? customer.email,
      password: data.password ?? customer.password,
      phone: data.phone ?? customer.phone,
      birth_date: birthDate,
      status: data.status ?? customer.status,
      role: data.role ?? customer.role
    };

    // 5) Query final
    const query = `
      UPDATE customers SET
        first_name = $1,
        last_name = $2,
        email = $3,
        password = $4,
        phone = $5,
        birth_date = $6,
        status = $7,
        role = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `;

    const params = [
      merged.first_name,
      merged.last_name,
      merged.email,
      merged.password,
      merged.phone,
      merged.birth_date,
      merged.status,
      merged.role,
      id
    ];

    console.log('[UPDATE] Ejecutando:', { query, params });

    const { rows } = await pool.query<Customer>(query, params);

    if (!rows.length) {
      throw new Error('CUSTOMER_NOT_FOUND');
    }

    return rows[0];

  } catch (error: any) {
    console.error('[CustomersPostgresRepository] Error en update:', {
      message: error.message,
      stack: error.stack
    });

    throw error;
  }
}

}

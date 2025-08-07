/*import { CustomerRepository } from "./customers.repository.interface.js";
import { Customer } from "./customers.entity.js";
import { Client } from "pg";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'customers',
    password: 'postgres',
    port: 5432
});

export class CustomerPostgresRepository implements CustomerRepository {

    constructor() {
        client.connect();
    }

    async findAll(): Promise<Customer[] | undefined> {
        const res = await client.query('SELECT * FROM customers');
        return res.rows as Customer[] || undefined;
    }

    async findOne(id: string): Promise<Customer | undefined> {
        const res = await client.query('SELECT * FROM customers WHERE id = $1', [id]);
        return res.rows[0] as Customer || undefined;
    }


    async partialUpdate(id: string, updates: Partial<Customer>): Promise<Customer | undefined> {
        try {
            const keys = Object.keys(updates);
            const values = Object.values(updates);
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
            const query = `UPDATE customers SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
            
            const res = await client.query(query, [...values, id]);
            return res.rows[0];
        } catch (error) {
            console.error('Error partially updating customer:', error);
            return undefined;
        }
    }

    async delete(id: string): Promise<Customer | undefined> {
        try {
            const res = await client.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
            return res.rows[0];
        } catch (error) {
            console.error('Error deleting customer:', error);
            return undefined;
        }
    }
}*/
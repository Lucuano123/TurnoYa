import { CustumerRepository } from "./custumer.repository.interface.js";
import { Custumer } from "./custumer.entity.js";
import { Client } from "pg";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'custumers',
    password: 'postgres',
    port: 5432
});

export class CustumerPostgresRepository implements CustumerRepository {

    constructor() {
        client.connect();
    }

    async findAll(): Promise<Custumer[] | undefined> {
        const res = await client.query('SELECT * FROM custumers');
        return res.rows as Custumer[] || undefined;
    }

    async findOne(id: string): Promise<Custumer | undefined> {
        const res = await client.query('SELECT * FROM custumers WHERE id = $1', [id]);
        return res.rows[0] as Custumer || undefined;
    }

    async add(custumer: Custumer): Promise<Custumer | undefined> {
        try {
            const res = await client.query(
                'INSERT INTO custumers (name, lastname, cellphone, email) VALUES ($1, $2, $3, $4) RETURNING *',
                [custumer.name, custumer.lastname, custumer.cellphone, custumer.email]
            );
            return res.rows[0];
        } catch (error) {
            console.error('Error adding custumer:', error);
            return undefined;
        }
    }

    async update(id: string, custumer: Custumer): Promise<Custumer | undefined> {
        try {
            const res = await client.query(
                'UPDATE custumers SET name = $1, lastname = $2, cellphone = $3, email = $4 RETURNING *',
                [custumer.name, custumer.lastname, custumer.cellphone, custumer.email]
            );
            return res.rows[0];
        } catch (error) {
            console.error('Error updating custumer:', error);
            return undefined;
        }
    }

    async partialUpdate(id: string, updates: Partial<Custumer>): Promise<Custumer | undefined> {
        try {
            const keys = Object.keys(updates);
            const values = Object.values(updates);
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
            const query = `UPDATE custumers SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
            
            const res = await client.query(query, [...values, id]);
            return res.rows[0];
        } catch (error) {
            console.error('Error partially updating custumer:', error);
            return undefined;
        }
    }

    async delete(id: string): Promise<Custumer | undefined> {
        try {
            const res = await client.query('DELETE FROM custumers WHERE id = $1 RETURNING *', [id]);
            return res.rows[0];
        } catch (error) {
            console.error('Error deleting custumer:', error);
            return undefined;
        }
    }
}
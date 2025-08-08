import { Services } from './services.entity.js';
import { query } from '../config/database.config';
import { ServicesRepository } from "./services.repository.interface.js";
import { Pool } from "pg";

const dbClient = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'services',
  password: 'postgres',
  port: 5432,
});

export class ServicesPostgresRepository implements ServicesRepository {
  constructor() {
    // Si usás Pool, no hace falta `connect()`, solo si querés probar la conexión manualmente
    // dbClient.connect();
  }

  async create(service: Services): Promise<Services> {
  try {
    const res = await dbClient.query(
      `INSERT INTO service (name, descipcion, duracion, price, category_id, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        service.name,
        service.descipcion,
        service.duracion,
        service.price,
        service.category_id,
        service.image_url
      ]
    );
    return res.rows[0]; // ✅ solo retornamos si todo fue bien
  } catch (error) {
    console.error('Error adding service:', error);
    throw error; // ❗ lanzamos el error o manejalo como prefieras
  }
}


}

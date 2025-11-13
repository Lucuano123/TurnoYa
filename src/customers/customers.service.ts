import { CustomersPostgresRepository } from './customers.postgres.repository.js';
import { Customer } from './customers.entity.js';

export class CustomersService {
  constructor(private customersRepository: CustomersPostgresRepository) {}

  // Actualiza el estado de un cliente (approve / reject)
  async validateUser(userId: number, status: 'approved' | 'rejected'): Promise<Customer> {
    const user = await this.customersRepository.findById(userId);

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    if (user.status !== 'pending') {
      throw new Error('USER_NOT_PENDING');
    }

    // Actualiza el estado directamente
    const updatedUser = await this.customersRepository.updateStatus(userId, status);
    return updatedUser;
  }

  // Obtiene todos los clientes
  async getAllCustomers(): Promise<Customer[]> {
    try {
      return await this.customersRepository.findAll();
    } catch (error) {
      console.error('[CustomersService] Error al obtener clientes:', error);
      throw error;
    }
  }

  // Obtiene solo los clientes con estado "pending"
  async getPendingUsers(): Promise<Customer[]> {
    try {
      return await this.customersRepository.findPendingUsers();
    } catch (error) {
      console.error('[CustomersService] Error al obtener usuarios pendientes:', error);
      throw error;
    }
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    try {
      const customer = await this.customersRepository.findById(id);
      return customer || null;
    } catch (error) {
      console.error('[CustomersService] Error al obtener cliente por ID:', error);
      throw error;
    }
  }
}

import { CustomersPostgresRepository } from './customers.postgres.repository.js';
import { Customer } from './customers.entity.js';

export class CustomersService {
  prisma: any;
  constructor(private customersRepository: CustomersPostgresRepository) { }

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


  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    try {
      const newCustomer = await this.customersRepository.create(data);
      return newCustomer;
    } catch (error) {
      console.error('[CustomersService] Error al crear cliente:', error);
      throw error;
    }
  }



  async updateCustomer(id: number, data: Partial<Customer>): Promise<Customer> {
    try {
      const existing = await this.customersRepository.findById(id);

      if (!existing) {
        throw new Error('CUSTOMER_NOT_FOUND');
      }

      const updated = await this.customersRepository.update(id, data);
      return updated;
    } catch (error) {
      console.error('[CustomersService] Error al actualizar cliente:', error);
      throw error;
    }
  }

  /*async deleteCustomer(id: number): Promise<void> {

  const existing = await this.customersRepository.findById(id);

  if (!existing) {
    throw new Error('CUSTOMER_NOT_FOUND');
  }

  try {
    await this.customersRepository.delete(id);

  } catch (error: any) {

    if (error.code === '23503') {
      throw new Error('CUSTOMER_HAS_BOOKINGS');
    }

    throw new Error('DELETE_ERROR');
  }
}*/

async countBookingsForCustomer(customerId: number): Promise<number> {
  return this.prisma.booking.count({
    where: { customerId }
  });
}

async deleteCustomer(id: number): Promise<void> {
  console.log('[SERVICE] → deleteCustomer llamado con id:', id);

  // 1. Buscar cliente
  const existing = await this.customersRepository.findById(id);
  console.log('[SERVICE] → Resultado de findById:', existing);

  if (!existing) {
    console.log('[SERVICE] ✖ CUSTOMER_NOT_FOUND');
    throw new Error('CUSTOMER_NOT_FOUND');
  }

  // 2. Chequear reservas
  console.log('[SERVICE] → Verificando reservas para cliente id:', id);
  const bookingsCount = await this.customersRepository.countBookingsForCustomer(id);
  console.log('[SERVICE] → Cantidad de reservas encontradas:', bookingsCount);

  if (bookingsCount > 0) {
    console.log('[SERVICE] ✖ CUSTOMER_HAS_BOOKINGS');
    throw new Error('CUSTOMER_HAS_BOOKINGS');
  }

  // 3. Intentar eliminar
  console.log('[SERVICE] → Intentando eliminar cliente id:', id);

  try {
    await this.customersRepository.delete(id);
    console.log('[SERVICE] ✔ Cliente eliminado correctamente');
  } catch (error: any) {
    console.error('[SERVICE] ✖ Error en delete():', error);
    throw new Error('DELETE_ERROR');
  }
}





}

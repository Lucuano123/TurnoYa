import { CustomersPostgresRepository } from './customers.postgres.repository.js';
import { notificationsService } from '../notifications/notifications.service.js';
import { Customer } from './customers.entity.js';

export class CustomersService {
  constructor(private customersRepository: CustomersPostgresRepository) {}

  async validateUser(userId: number, status: 'approved' | 'rejected', professionalId: number): Promise<Customer> {
    // Verificar que el usuario existe y está pendiente
    const user = await this.customersRepository.findById(userId);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    
    if (user.status !== 'pending') {
      throw new Error('USER_NOT_PENDING');
    }

    // Actualizar estado del usuario
    const updatedUser = await this.customersRepository.updateStatus(userId, status);
    
    // Enviar notificación al usuario
    await notificationsService.sendNotification({
      userId: user.id,
      message: `Su cuenta ha sido ${status === 'approved' ? 'aprobada' : 'rechazada'}`,
      type: 'email'
    });

    return updatedUser;
  }
  async getAllCustomers(): Promise<Customer[]> {
  try {
    return await this.customersRepository.findAll();
  } catch (error) {
    console.error('[CustomersService] Error getting all customers:', error);
    throw error;
  }
}
  async getPendingUsers(): Promise<Customer[]> {
    return this.customersRepository.findPendingUsers();
  }
}
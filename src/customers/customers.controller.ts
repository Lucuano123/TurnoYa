import { Request, Response } from 'express';
import { CustomersService } from './customers.service.js';
import { CustomersPostgresRepository } from './customers.postgres.repository.js';
import { pool } from '../config/database.config.js';
import { Customer } from './customers.entity.js';

export class CustomersController {
  private customersService: CustomersService;

  constructor() {
    
    const repository = new CustomersPostgresRepository();
    this.customersService = new CustomersService(repository);
  }

  // GET /api/customers/all
  async getAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      console.log('[CustomersController] getAllCustomers');
      const customers = await this.customersService.getAllCustomers();
      res.status(200).json({ data: customers });
    } catch (error) {
      console.error('[CustomersController] Error en getAllCustomers:', error);
      res.status(500).json({
        error: {
          message: 'Error al obtener todos los clientes',
          code: 'SERVER_ERROR',
          status: 500,
        },
      });
    }
  }

  // GET /api/customers/pending
  async getPendingUsers(req: Request, res: Response): Promise<void> {
    try {
      console.log('[CustomersController] getPendingUsers');
      const pendingUsers = await this.customersService.getPendingUsers();
      res.status(200).json({ data: pendingUsers });
    } catch (error) {
      console.error('[CustomersController] Error en getPendingUsers:', error);
      res.status(500).json({
        error: {
          message: 'Error al obtener usuarios pendientes',
          code: 'SERVER_ERROR',
          status: 500,
        },
      });
    }
  }

  // PUT /api/customers/:id/validate
  async validateUser(req: Request, res: Response): Promise<void> {
    try {
      console.log('[CustomersController] validateUser');
      const { id } = req.params;
      const { status } = req.body;

      if (!['approved', 'rejected'].includes(status)) {
        res.status(400).json({
          error: {
            message: 'Estado inválido. Debe ser "approved" o "rejected"',
            code: 'INVALID_STATUS',
            status: 400,
          },
        });
        return;
      }

      const user = await this.customersService.validateUser(parseInt(id), status);

      res.status(200).json({
        id: user.id,
        email: user.email,
        status: user.status,
        message: 'Estado del usuario actualizado correctamente',
      });
    } catch (error: any) {
      console.error('[CustomersController] Error en validateUser:', error);

      if (error.message === 'USER_NOT_FOUND') {
        res.status(404).json({
          error: {
            message: 'Usuario no encontrado',
            code: 'USER_NOT_FOUND',
            status: 404,
          },
        });
      } else if (error.message === 'USER_NOT_PENDING') {
        res.status(400).json({
          error: {
            message: 'El usuario no está en estado pendiente',
            code: 'USER_NOT_PENDING',
            status: 400,
          },
        });
      } else {
        res.status(500).json({
          error: {
            message: 'Error del servidor',
            code: 'SERVER_ERROR',
            status: 500,
          },
        });
      }
    }
  }

  // GET /api/customers/:id 
  async getCustomerById(req: Request, res: Response): Promise<void> {
    try {
      console.log('[CustomersController] getCustomerById');
      const { id } = req.params;
      const customer = await this.customersService.getCustomerById(parseInt(id));
      res.status(200).json({ data: customer });
    }
    catch (error) {
      console.error('[CustomersController] Error en getCustomerById:', error);
      res.status(500).json({
        error: {
          message: 'Error al obtener cliente por ID',
          code: 'SERVER_ERROR',
          status: 500,
        },
      });
    }
  }

  // PUT /api/customers/:id
async updateCustomer(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await this.customersService.updateCustomer(parseInt(id), data);

    res.status(200).json({ data: updated });

  } catch (error: any) {
    console.error('[CustomersController] Error en updateCustomer:', error);

    if (error.message === 'CUSTOMER_NOT_FOUND') {
      res.status(404).json({
        error: { message: 'Cliente no encontrado', code: 'CUSTOMER_NOT_FOUND', status: 404 }
      });
      return;
    }

    res.status(500).json({
      error: { message: 'Error al actualizar cliente', code: 'SERVER_ERROR', status: 500 }
    });
  }
}

  /// POST /api/customers
async createCustomer(req: Request, res: Response): Promise<void> {
  try {
    console.log('---- [Controller] POST /api/customers ----');
    console.log('[Controller] Body recibido:', req.body);

    const data = req.body;

    console.log('[Controller] Llamando al service.createCustomer...');
    const newCustomer = await this.customersService.createCustomer(data);
    console.log('[Controller] Respuesta del service:', newCustomer);

    res.status(201).json({ data: newCustomer });
  } catch (error) {
    console.error('[Controller] Error en createCustomer:', error);

    res.status(500).json({
      error: {
        message: 'Error al crear cliente',
        code: 'SERVER_ERROR',
        status: 500,
      }
    });
  }
}

  // DELETE /api/customers/:id
 async deleteCustomer(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);

    await this.customersService.deleteCustomer(id);

    res.status(204).send(); // No Content
  } catch (error) {
    const err = error as Error;

    console.error('[CustomersController] Error en deleteCustomer:', err);

    if (err.message === 'CUSTOMER_NOT_FOUND') {
      res.status(404).json({ message: 'Cliente no encontrado' });
      return;
    }

    if (err.message === 'CUSTOMER_HAS_BOOKINGS') {
      res.status(409).json({
        message: 'El cliente no puede eliminarse porque tiene reservas asociadas.'
      });
      return;
    }

    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
 }



}
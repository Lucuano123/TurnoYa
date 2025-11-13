import { Request, Response } from 'express';
import { CustomersService } from './customers.service.js';
import { CustomersPostgresRepository } from './customers.postgres.repository.js';

export class CustomersController {
  private customersService: CustomersService;

  constructor() {
    // El controller crea su propio servicio y repositorio (como en characters)
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

}
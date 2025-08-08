import { Request, Response } from 'express';
import { CustomersService } from './customers.service.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { Customer } from './customers.entity.js';

export class CustomersController {
  
  private customersService: CustomersService;

  constructor(customersService: CustomersService) {
    this.customersService = customersService;
    console.log('[CustomersController] Constructor - Servicio recibido:', !!customersService);
  }

  async getAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      console.log('[Controller] Iniciando getAllCustomers');
      console.log('[Controller] customersService existe:', !!this.customersService);
      
      const customers = await this.customersService.getAllCustomers();
      console.log('[Controller] Clientes obtenidos:', customers.length);
      res.status(200).json(customers);
    } catch (error) {
      console.error('[Controller] Error:', error);
      res.status(500).json({
        error: {
          message:  'Error al obtener todos los clientes',
          code:  'SERVER_ERROR',
          status:  500
        }
      });
    }
  }
  async validateUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      console.log('[Controller] Iniciando validateUser');
      console.log('[Controller] Parámetros de la ruta:', req.params);
      console.log('[Controller] Cuerpo de la petición:', req.body);
      console.log('[Controller] Usuario autenticado:', req.customer);
      
      const { id } = req.params;
      const { status } = req.body;
      const professionalId = req.customer?.id; // ID del profesional autenticado
      
      console.log('[Controller] ID a validar:', id);
      console.log('[Controller] Nuevo status:', status);
      console.log('[Controller] ID profesional:', professionalId);

      if (professionalId === undefined) {
        console.log('[Controller] Error: ID profesional no definido');
        res.status(400).json({
          error: {
            message: 'ID del profesional no definido',
            code: 'PROFESSIONAL_ID_UNDEFINED',
            status: 400
          }
        });
        return;
      }
      
      if (!['approved', 'rejected'].includes(status)) {
        console.log('[Controller] Status inválido:', status);
        res.status(400).json({
          error: {
            message: 'Estado inválido. Debe ser "approved" o "rejected"',
            code: 'INVALID_STATUS',
            status: 400
          }
        });
        return;
      }
      
      console.log('[Controller] Llamando al servicio para validar usuario');
      const user = await this.customersService.validateUser(
        parseInt(id), 
        status, 
        professionalId
      );
      
      console.log('[Controller] Usuario validado exitosamente:', user);
      
      res.status(200).json({
        id: user.id,
        email: user.email,
        status: user.status,
        message: 'Estado de usuario actualizado'
      });
    } catch (error) {
      console.error('[Controller] Error en validateUser:', error);
      const err = error as { message?: string };
      
      if (err.message === 'USER_NOT_FOUND') {
        console.log('[Controller] Error: Usuario no encontrado');
        res.status(404).json({
          error: {
            message: 'Usuario no encontrado',
            code: 'USER_NOT_FOUND',
            status: 404
          }
        });
      } else if (err.message === 'USER_NOT_PENDING') {
        console.log('[Controller] Error: Usuario no está pendiente');
        res.status(400).json({
          error: {
            message: 'El usuario no está en estado pendiente',
            code: 'USER_NOT_PENDING',
            status: 400
          }
        });
      } else {
        console.error('[Controller] Error no manejado:', error);
        res.status(500).json({
          error: {
            message: 'Error del servidor',
            code: 'SERVER_ERROR',
            status: 500
          }
        });
      }
    }
  }

  async getPendingUsers(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const pendingUsers = await this.customersService.getPendingUsers();
      res.status(200).json(pendingUsers);
    } catch (error) {
      res.status(500).json({
        error: {
          message: 'Error al obtener usuarios pendientes - aca estoy en el controlador',
          code: 'SERVER_ERROR',
          status: 500
        }
      });
    }
  }
}
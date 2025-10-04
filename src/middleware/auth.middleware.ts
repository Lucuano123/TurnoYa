import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/database.config.js';

interface Customer {
  id: number;
  email: string; 
  role: string;
  status: string;
}

export interface AuthenticatedRequest extends Request {
  customer?: Customer;
}

export const authMiddleware = (roles: string[] = []) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const customerId = req.headers['x-user-id'] as string;
    
    if (!customerId) {
      res.status(401).json({ error: { message: 'ID de usuario no proporcionado', code: 'USER_ID_MISSING', status: 401 } });
      return;
    }

    try {
      const query = 'SELECT id, email, role, status FROM customers WHERE id = $1';
      const { rows } = await pool.query(query, [parseInt(customerId)]);
      
      if (rows.length === 0) {
        res.status(401).json({ error: { message: 'Usuario no encontrado', code: 'USER_NOT_FOUND', status: 401 } });
        return;
      }

      const customer = rows[0] as Customer;

      if (customer.status !== 'approved') {
        res.status(403).json({ error: { message: 'Acceso denegado: usuario no aprobado', code: 'AUTH_NOT_APPROVED', status: 403 } });
        return;
      }

      if (roles.length > 0 && !roles.includes(customer.role)) {
        res.status(403).json({ error: { message: 'Acceso denegado: rol insuficiente', code: 'AUTH_FORBIDDEN', status: 403 } });
        return;
      }

      req.customer = customer; 
      next();
    } catch (error) {
      console.error('[AuthMiddleware] Error:', error instanceof Error ? error.message : String(error), error instanceof Error ? error.stack : '');
      res.status(500).json({ error: { message: 'Error del servidor', code: 'SERVER_ERROR', status: 500, cause: error instanceof Error ? error.message : String(error) } });
    }
  };
};
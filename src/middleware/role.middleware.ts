import { Request, Response, NextFunction } from 'express';

// Extiende la interfaz Request para incluir 'user'
declare global {
  namespace Express {
    interface User {
      role: string;
    }
    interface Request {
      user?: User;
    }
  }
}

export const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: {
          message: 'No autorizado',
          code: 'UNAUTHORIZED',
          status: 401
        }
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        error: {
          message: 'Prohibido',
          code: 'FORBIDDEN',
          status: 403
        }
      });
    }

    next();
  };
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config.js';

// Interfaz para el payload del JWT
interface JwtPayload {
  id: number;
  role: string;
  status: string;
}

// Middleware para verificar JWT, roles y estado
export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // Verificar si el encabezado Authorization existe y es un Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: {
          message: 'Token de autenticación no proporcionado',
          code: 'AUTH_TOKEN_MISSING',
          status: 401,
        },
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verificar el token con la clave secreta
      const decoded = jwt.verify(token, envConfig.JWT_SECRET) as JwtPayload;

      // Verificar si el usuario tiene uno de los roles requeridos (si se especifican)
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        res.status(403).json({
          error: {
            message: 'Acceso denegado: rol insuficiente',
            code: 'AUTH_FORBIDDEN',
            status: 403,
          },
        });
        return;
      }

      // Verificar si el usuario está aprobado
      if (decoded.status !== 'approved') {
        res.status(403).json({
          error: {
            message: 'Acceso denegado: usuario no aprobado',
            code: 'AUTH_NOT_APPROVED',
            status: 403,
          },
        });
        return;
      }

      // Adjuntar el payload decodificado a res.locals
      res.locals.authUser = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        error: {
          message: 'Token inválido',
          code: 'AUTH_TOKEN_INVALID',
          status: 401,
        },
      });
      return;
    }
  };
};
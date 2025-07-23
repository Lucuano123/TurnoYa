// Validación de JWT y roles
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';

// Interfaz para el payload del JWT
interface JwtPayload {
  id: number;
  role: string;
  status: string;
}

// Middleware para verificar JWT, roles y estado
export const authMiddleware = (roles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Verificar si el encabezado Authorization existe y es un Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: {
          message: 'Token de autenticación no proporcionado',
          code: 'AUTH_TOKEN_MISSING',
          status: 401,
        },
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verificar el token con la clave secreta
      const decoded = jwt.verify(token, envConfig.JWT_SECRET) as JwtPayload;

      // Verificar si el usuario tiene uno de los roles requeridos (si se especifican)
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({
          error: {
            message: 'Acceso denegado: rol insuficiente',
            code: 'AUTH_FORBIDDEN',
            status: 403,
          },
        });
      }

      // Verificar si el usuario está aprobado
      if (decoded.status !== 'approved') {
        return res.status(403).json({
          error: {
            message: 'Acceso denegado: usuario no aprobado',
            code: 'AUTH_NOT_APPROVED',
            status: 403,
          },
        });
      }

      // Adjuntar el payload decodificado a res.locals
      res.locals.authUser = decoded; //Usamos req.locals para no añadir una propiedad al objeto req (req.user) lo que haría que tengamos que crear el archivo express.d.ts
      next();
    } catch (error) {
      return res.status(401).json({
        error: {
          message: 'Token inválido',
          code: 'AUTH_TOKEN_INVALID',
          status: 401,
        },
      });
    }
  };
};
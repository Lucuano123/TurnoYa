import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../errors/DatabaseError';

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof DatabaseError) {
    return res.status(err.status).json({ error: err.message, code: err.code });
  }

  console.error('[Unhandled Error]', err);
  return res.status(500).json({
    error: 'Error interno del servidor',
    code: 'INTERNAL_ERROR',
  });
};

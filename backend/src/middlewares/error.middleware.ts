import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { env } from '../config/env';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({ success: false, message: 'Data duplikat' });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
      return;
    }
  }

  console.error(err);
  res.status(500).json({
    success: false,
    message: env.NODE_ENV === 'production' ? 'Terjadi kesalahan server' : err.message,
  });
}

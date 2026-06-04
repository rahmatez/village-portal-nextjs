import { Response } from 'express';
import { authService } from '../services/auth.service';
import { env } from '../config/env';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export const authController = {
  login: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await authService.login(req.body);
    res.cookie('accessToken', result.token, COOKIE_OPTIONS);
    res.json({ success: true, data: result.user });
  }),

  register: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, data: user });
  }),

  logout: asyncHandler(async (_req: AuthRequest, res: Response) => {
    res.clearCookie('accessToken', { path: '/' });
    res.json({ success: true, message: 'Logout berhasil' });
  }),

  me: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await authService.getProfile(req.user!.userId);
    res.json({ success: true, data: user });
  }),

  listUsers: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await authService.listUsers();
    res.json({ success: true, data });
  }),
};

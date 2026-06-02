import { Response } from 'express';
import { statistikService } from '../services/statistik.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const statistikController = {
  getPublic: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await statistikService.getPublic();
    res.json({ success: true, data });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await statistikService.update(req.body);
    res.json({ success: true, data });
  }),
};

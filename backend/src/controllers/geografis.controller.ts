import { Response } from 'express';
import { geografisService } from '../services/geografis.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const geografisController = {
  getPublic: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await geografisService.getPublic();
    res.json({ success: true, data });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await geografisService.update(req.body);
    res.json({ success: true, data });
  }),
};

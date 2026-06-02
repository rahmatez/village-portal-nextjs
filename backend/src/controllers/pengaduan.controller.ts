import { Response } from 'express';
import { pengaduanService } from '../services/pengaduan.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const pengaduanController = {
  list: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await pengaduanService.list();
    res.json({ success: true, data });
  }),

  getByTicket: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await pengaduanService.getByTicket(req.params.ticket);
    res.json({ success: true, data });
  }),

  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await pengaduanService.create(req.body);
    res.status(201).json({ success: true, data });
  }),

  updateStatus: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await pengaduanService.updateStatus(
      req.params.id,
      req.user!.userId,
      req.body
    );
    res.json({ success: true, data });
  }),
};

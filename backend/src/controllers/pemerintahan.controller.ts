import { Response } from 'express';
import { pemerintahanService } from '../services/pemerintahan.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const pemerintahanController = {
  getPublic: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await pemerintahanService.getPublic();
    res.json({ success: true, data });
  }),

  updateWilayah: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await pemerintahanService.updateWilayah(req.body);
    res.json({ success: true, data });
  }),

  createPerangkat: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await pemerintahanService.createPerangkat(req.body);
    res.status(201).json({ success: true, data });
  }),

  updatePerangkat: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await pemerintahanService.updatePerangkat(req.params.id, req.body);
    res.json({ success: true, data });
  }),

  deletePerangkat: asyncHandler(async (req: AuthRequest, res: Response) => {
    await pemerintahanService.deletePerangkat(req.params.id);
    res.json({ success: true, message: 'Perangkat dihapus' });
  }),
};

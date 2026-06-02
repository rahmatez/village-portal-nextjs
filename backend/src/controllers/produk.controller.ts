import { Response } from 'express';
import { produkService } from '../services/produk.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const produkController = {
  listPublic: asyncHandler(async (req: AuthRequest, res: Response) => {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const data = await produkService.listPublic(limit);
    res.json({ success: true, data });
  }),

  listAll: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await produkService.listAll();
    res.json({ success: true, data });
  }),

  getById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await produkService.getById(req.params.id);
    res.json({ success: true, data });
  }),

  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await produkService.create(req.body);
    res.status(201).json({ success: true, data });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await produkService.update(req.params.id, req.body);
    res.json({ success: true, data });
  }),

  remove: asyncHandler(async (req: AuthRequest, res: Response) => {
    await produkService.remove(req.params.id);
    res.json({ success: true, message: 'Produk dihapus' });
  }),
};

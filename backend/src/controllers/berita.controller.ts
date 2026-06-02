import { Response } from 'express';
import { beritaService } from '../services/berita.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const beritaController = {
  listPublished: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await beritaService.listPublished();
    res.json({ success: true, data });
  }),

  listAll: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await beritaService.listAll();
    res.json({ success: true, data });
  }),

  getBySlug: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await beritaService.getBySlug(req.params.slug);
    res.json({ success: true, data });
  }),

  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await beritaService.create(req.user!.userId, req.body);
    res.status(201).json({ success: true, data });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await beritaService.update(req.params.id, req.body);
    res.json({ success: true, data });
  }),

  remove: asyncHandler(async (req: AuthRequest, res: Response) => {
    await beritaService.remove(req.params.id);
    res.json({ success: true, message: 'Berita dihapus' });
  }),
};

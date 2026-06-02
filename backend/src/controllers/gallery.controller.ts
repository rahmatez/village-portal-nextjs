import { Response } from 'express';
import { galleryService } from '../services/gallery.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const galleryController = {
  list: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await galleryService.listPublic({
      page: req.query.page as string,
      limit: req.query.limit as string,
      search: req.query.search as string,
    });
    res.json({ success: true, ...data });
  }),

  getById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await galleryService.getById(req.params.id);
    res.json({ success: true, data });
  }),

  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await galleryService.create(req.body);
    res.status(201).json({ success: true, data });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await galleryService.update(req.params.id, req.body);
    res.json({ success: true, data });
  }),

  remove: asyncHandler(async (req: AuthRequest, res: Response) => {
    await galleryService.remove(req.params.id);
    res.json({ success: true, message: 'Foto dihapus' });
  }),
};

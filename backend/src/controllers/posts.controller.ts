import { Response } from 'express';
import { postsService } from '../services/posts.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const postsController = {
  listPublic: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await postsService.listPublic({
      page: req.query.page as string,
      limit: req.query.limit as string,
      search: req.query.search as string,
    });
    res.json({ success: true, data: result.items, meta: result.meta });
  }),

  listAdmin: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await postsService.listAdmin({
      page: req.query.page as string,
      limit: req.query.limit as string,
      search: req.query.search as string,
    });
    res.json({ success: true, data: result.items, meta: result.meta });
  }),

  getBySlug: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await postsService.getBySlug(req.params.slug);
    res.json({ success: true, data });
  }),

  getBySlugAdmin: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await postsService.getBySlug(req.params.slug, true);
    res.json({ success: true, data });
  }),

  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await postsService.create(req.body);
    res.status(201).json({ success: true, data });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await postsService.update(req.params.id, req.body);
    res.json({ success: true, data });
  }),

  remove: asyncHandler(async (req: AuthRequest, res: Response) => {
    await postsService.remove(req.params.id);
    res.json({ success: true, message: 'Berita dihapus' });
  }),
};

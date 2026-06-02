import { Response } from 'express';
import { apbDesaService } from '../services/apb-desa.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../middlewares/error.middleware';

export const apbDesaController = {
  getByTahun: asyncHandler(async (req: AuthRequest, res: Response) => {
    const tahun = Number(req.query.tahun);
    if (!tahun || Number.isNaN(tahun)) {
      throw new AppError(400, 'Parameter tahun wajib diisi');
    }
    const data = await apbDesaService.getByTahun(tahun);
    res.json({ success: true, data });
  }),

  listTahun: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await apbDesaService.listTahun();
    res.json({ success: true, data });
  }),

  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await apbDesaService.create(req.body);
    res.status(201).json({ success: true, data });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await apbDesaService.update(req.params.id, req.body);
    res.json({ success: true, data });
  }),

  remove: asyncHandler(async (req: AuthRequest, res: Response) => {
    await apbDesaService.remove(req.params.id);
    res.json({ success: true, message: 'APB dihapus' });
  }),
};

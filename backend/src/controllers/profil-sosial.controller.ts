import { Response } from 'express';
import { profilSosialService } from '../services/profil-sosial.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const profilSosialController = {
  getAll: asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await profilSosialService.getAll();
    res.json({ success: true, data });
  }),

  updateKependudukan: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await profilSosialService.updateKependudukan(req.body);
    res.json({ success: true, data });
  }),

  replaceDemografi: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await profilSosialService.replaceDemografi(req.body);
    res.json({ success: true, data });
  }),

  replaceFasilitas: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await profilSosialService.replaceFasilitas(req.body);
    res.json({ success: true, data });
  }),

  replaceMataPencaharian: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await profilSosialService.replaceMataPencaharian(req.body);
    res.json({ success: true, data });
  }),
};

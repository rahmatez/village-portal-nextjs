import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { env } from '../config/env';

export const uploadController = {
  uploadImage: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'File gambar wajib diunggah' });
      return;
    }
    const base = env.API_PUBLIC_URL.replace(/\/$/, '');
    const url = `${base}/uploads/${req.file.filename}`;
    res.status(201).json({
      success: true,
      data: { url, filename: req.file.filename },
    });
  }),
};

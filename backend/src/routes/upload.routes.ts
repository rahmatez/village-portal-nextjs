import { Router } from 'express';
import { uploadController } from '../controllers/upload.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { uploadImage } from '../middlewares/upload.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  uploadImage.single('file'),
  uploadController.uploadImage
);

export default router;

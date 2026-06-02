import { Router } from 'express';
import { galleryController } from '../controllers/gallery.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createGallerySchema, updateGallerySchema } from '../validators/gallery.validator';

const router = Router();

router.get('/', galleryController.list);
router.get('/:id', galleryController.getById);

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(createGallerySchema),
  galleryController.create
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updateGallerySchema),
  galleryController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  galleryController.remove
);

export default router;

import { Router } from 'express';
import { beritaController } from '../controllers/berita.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createBeritaSchema, updateBeritaSchema } from '../validators/berita.validator';

const router = Router();

router.get('/published', beritaController.listPublished);
router.get('/admin', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), beritaController.listAll);
router.get('/:slug', beritaController.getBySlug);
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(createBeritaSchema),
  beritaController.create
);
router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updateBeritaSchema),
  beritaController.update
);
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  beritaController.remove
);

export default router;

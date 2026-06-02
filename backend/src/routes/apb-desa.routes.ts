import { Router } from 'express';
import { apbDesaController } from '../controllers/apb-desa.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createApbSchema, updateApbSchema } from '../validators/apb-desa.validator';

const router = Router();

router.get('/tahun', apbDesaController.listTahun);
router.get('/', apbDesaController.getByTahun);

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(createApbSchema),
  apbDesaController.create
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updateApbSchema),
  apbDesaController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  apbDesaController.remove
);

export default router;

import { Router } from 'express';
import { produkController } from '../controllers/produk.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createProdukSchema, updateProdukSchema } from '../validators/produk.validator';

const router = Router();

router.get('/', produkController.listPublic);
router.get('/admin', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), produkController.listAll);
router.get('/:id', produkController.getById);
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(createProdukSchema),
  produkController.create
);
router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updateProdukSchema),
  produkController.update
);
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  produkController.remove
);

export default router;

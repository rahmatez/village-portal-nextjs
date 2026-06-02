import { Router } from 'express';
import { pemerintahanController } from '../controllers/pemerintahan.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import {
  updateWilayahSchema,
  perangkatSchema,
  updatePerangkatSchema,
} from '../validators/pemerintahan.validator';

const router = Router();

router.get('/', pemerintahanController.getPublic);

router.put(
  '/wilayah',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updateWilayahSchema),
  pemerintahanController.updateWilayah
);

router.post(
  '/perangkat',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(perangkatSchema),
  pemerintahanController.createPerangkat
);

router.put(
  '/perangkat/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updatePerangkatSchema),
  pemerintahanController.updatePerangkat
);

router.delete(
  '/perangkat/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  pemerintahanController.deletePerangkat
);

export default router;

import { Router } from 'express';
import { pengaduanController } from '../controllers/pengaduan.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import {
  createPengaduanSchema,
  updatePengaduanStatusSchema,
} from '../validators/pengaduan.validator';
import { pengaduanLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post('/', pengaduanLimiter, validate(createPengaduanSchema), pengaduanController.create);
router.get('/ticket/:ticket', pengaduanController.getByTicket);
router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  pengaduanController.list
);
router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updatePengaduanStatusSchema),
  pengaduanController.updateStatus
);

export default router;

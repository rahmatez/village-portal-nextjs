import { Router } from 'express';
import { statistikController } from '../controllers/statistik.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { updateStatistikSchema } from '../validators/statistik.validator';

const router = Router();

router.get('/', statistikController.getPublic);
router.patch(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updateStatistikSchema),
  statistikController.update
);

export default router;

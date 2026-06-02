import { Router } from 'express';
import { geografisController } from '../controllers/geografis.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { updateGeografisSchema } from '../validators/geografis.validator';

const router = Router();

router.get('/', geografisController.getPublic);

router.put(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updateGeografisSchema),
  geografisController.update
);

export default router;

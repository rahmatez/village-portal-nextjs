import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);
router.post(
  '/register',
  authenticate,
  authorize('SUPER_ADMIN'),
  validate(registerSchema),
  authController.register
);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);

export default router;

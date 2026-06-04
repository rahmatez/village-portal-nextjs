import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { authLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post(
  '/register',
  authenticate,
  authorize('SUPER_ADMIN'),
  validate(registerSchema),
  authController.register
);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);
router.get(
  '/users',
  authenticate,
  authorize('SUPER_ADMIN'),
  authController.listUsers
);

export default router;

import { Router } from 'express';
import { postsController } from '../controllers/posts.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createPostSchema, updatePostSchema } from '../validators/posts.validator';

const router = Router();

router.get('/', postsController.listPublic);
router.get('/admin', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), postsController.listAdmin);
router.get('/slug/:slug', postsController.getBySlug);
router.get(
  '/slug/:slug/admin',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  postsController.getBySlugAdmin
);

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(createPostSchema),
  postsController.create
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updatePostSchema),
  postsController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  postsController.remove
);

export default router;

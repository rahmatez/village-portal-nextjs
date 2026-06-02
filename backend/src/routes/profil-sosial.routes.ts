import { Router } from 'express';
import { profilSosialController } from '../controllers/profil-sosial.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import {
  updateKependudukanSchema,
  replaceDemografiSchema,
  replaceFasilitasSchema,
  replaceMataPencaharianSchema,
} from '../validators/profil-sosial.validator';

const router = Router();

router.get('/', profilSosialController.getAll);

router.put(
  '/kependudukan',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(updateKependudukanSchema),
  profilSosialController.updateKependudukan
);

router.put(
  '/demografi',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(replaceDemografiSchema),
  profilSosialController.replaceDemografi
);

router.put(
  '/fasilitas',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(replaceFasilitasSchema),
  profilSosialController.replaceFasilitas
);

router.put(
  '/mata-pencaharian',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  validate(replaceMataPencaharianSchema),
  profilSosialController.replaceMataPencaharian
);

export default router;

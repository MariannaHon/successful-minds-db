import { Router } from 'express';
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  logoutController,
  refreshUserController,
  requestResetEmailController,
  signinController,
  signupController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  requestResetEmailSchema,
  signinUserSchema,
  signupUserSchema,
} from '../validation/auth.js';

const router = Router();

router.post(
  '/signup',
  validateBody(signupUserSchema),
  ctrlWrapper(signupController)
);

router.post(
  '/signin',
  validateBody(signinUserSchema),
  ctrlWrapper(signinController)
);

router.get('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshUserController));

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);
// ++++++++++++++++++++++++++++++++
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);
export default router;

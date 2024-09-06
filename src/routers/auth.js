import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  logoutController,
  refreshUserController,
  signinController,
  signupController,
  updatePasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { signinUserSchema, signupUserSchema } from '../validation/auth.js';

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
router.patch(
  '/password',
  validateBody(signinUserSchema),
  ctrlWrapper(updatePasswordController)
);
export default router;

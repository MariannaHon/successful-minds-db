import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  logoutController,
  signinController,
  signupController,
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

export default router;

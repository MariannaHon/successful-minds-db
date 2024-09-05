import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  patchUserController,
  getUserController,
  patchAvatarController,
} from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { checkUser } from '../middlewares/checkUser.js';

const router = express.Router();
const jsonParser = express.json();
router.use(authenticate);
router.use(checkUser);

router.patch(
  '/avatar',
  upload.single('avatarUrl'),
  ctrlWrapper(patchAvatarController)
);

router.get('/', jsonParser, ctrlWrapper(getUserController));

router.patch(
  '/',
  jsonParser,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController)
);

export default router;

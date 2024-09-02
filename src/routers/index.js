import express from 'express';
import waterRouter from './water.js';
import authRouter from './auth.js';
import userRouter from './user.js';
import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = express.Router();

router.use('/water', waterRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/api-docs', swaggerDocs());

export default router;

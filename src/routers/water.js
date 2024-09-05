import { Router } from "express";
import { getWaterController, createWaterController, patchWaterController, deleteWaterController, getWaterStatsMonthController } from "../controllers/water.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createWaterSchema } from '../validation/water.js';
import { updateWaterSchema } from "../validation/water.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkUser } from '../middlewares/checkUser.js';

import { getWaterStatsController } from "../controllers/water.js";


const router = Router();

router.use(authenticate);

router.use(checkUser);


router.get('/', ctrlWrapper(getWaterController));

router.post('/', validateBody(createWaterSchema), ctrlWrapper(createWaterController));

router.patch('/:recordId', isValidId, validateBody(updateWaterSchema), ctrlWrapper(patchWaterController));

router.delete('/:recordId', isValidId, ctrlWrapper(deleteWaterController));

router.get('/today', ctrlWrapper(getWaterStatsController));

router.get('/month', ctrlWrapper(getWaterStatsMonthController));


export default router;

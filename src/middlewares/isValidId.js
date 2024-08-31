import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { recordId, userId } = req.params;
  if (!isValidObjectId(recordId || userId)) {
    throw createHttpError(400, 'ID is not valid');
  }
  next();
};


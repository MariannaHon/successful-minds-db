import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { recordId } = req.params;
  if (!isValidObjectId(recordId)) {
    throw createHttpError(404, 'Not found');
  }
  next();
};


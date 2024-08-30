import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, res, next) {
  const { recordId } = req.params;

  if (isValidObjectId(recordId) === false) {
    return next(createHttpError(400, 'ID is not valid'));
  }

  next();
}

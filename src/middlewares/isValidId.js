import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, res, next) {
  const { waterId } = req.params;

  if (isValidObjectId(waterId) === false) {
    return next(createHttpError(400, 'ID is not valid'));
  }

  next();
}

import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';

export function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return next(createHttpError(401, 'Token not found'));
  }

  const compare = jwt.verify(token, env('JWT_SECRET'));

  if (!compare) {
    return next(createHttpError(401, 'Token is not valid'));
  }

  next();
}

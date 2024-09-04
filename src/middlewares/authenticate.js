import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';

export function authenticate(req, res, next) {
  const authHeaded = req.headers['authorization'];
  const token = authHeaded && authHeaded.split(' ')[1];

  if (!token) {
    return next(createHttpError(401, 'Token not found'));
  }

  jwt.verify(token, env('JWT_SECRET'), (err, user) => {
    if (err) return createHttpError(401, 'Token is invalid or expider');

    req.user = user;

    next();
  });
}

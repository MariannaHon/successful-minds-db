import jwt from 'jsonwebtoken';

import { env } from './env.js';
import { REFRESH_TOKEN_AGE, ACCESS_TOKEN_AGE } from '../constants/index.js';


export function createRefreshToken(id) {
  return jwt.sign({ id }, env('JWT_SECRET'), {
    expiresIn: REFRESH_TOKEN_AGE,
  });
}

export function createAccessToken(id) {
  return jwt.sign({ id }, env('JWT_SECRET'), {
    expiresIn: ACCESS_TOKEN_AGE,
  });
}

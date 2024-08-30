import jwt from 'jsonwebtoken';

import { env } from './env.js';
import { MAX_TOKEN_AGE } from '../constants/index.js';

export function createToken(id) {
  return jwt.sign({ id }, env('JWT_SECRET'), {
    expiresIn: MAX_TOKEN_AGE,
  });
}

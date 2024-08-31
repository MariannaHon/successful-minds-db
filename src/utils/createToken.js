import jwt from 'jsonwebtoken';

import { env } from './env.js';

export function createToken(id) {
  return jwt.sign({ id }, env('JWT_SECRET'), {
    expiresIn: '15m',
  });
}

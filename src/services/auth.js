import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import {
  createAccessToken,
  createRefreshToken,
} from '../utils/createTokens.js';

export const signup = async payload => {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });

  if (user) {
    throw createHttpError(409, 'Email already taken');
  }

  const hashPwd = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({ ...payload, password: hashPwd });
};

export const signin = async (email, password) => {
  const user = await UsersCollection.findOne({
    email,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const comparePwd = await bcrypt.compare(password, user.password);

  if (!comparePwd) {
    throw createHttpError(401, 'Credentials is incorrect');
  }

  return user;
};

export const refreshUser = async token => {
  if (!token) return createHttpError(401, 'Token is not found');

  try {
    const user = jwt.verify(token, env('JWT_SECRET'));

    const newRefreshToken = createRefreshToken(user._id);

    const newAccessToken = createAccessToken(user._id);

    return {
      newRefreshToken,
      newAccessToken,
    };
  } catch (err) {
    console.log(err);
    throw createHttpError(400, 'Invalid token');
  }
};
export const updatePassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';

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
  console.log(user);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const comparePwd = await bcrypt.compare(password, user.password);

  if (!comparePwd) {
    throw createHttpError(401, 'Credentials is incorrect');
  }

  return user;
};

import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import {
  createAccessToken,
  createRefreshToken,
} from '../utils/createTokens.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { SMTP, TEMPLATE_DIR } from '../constants/index.js';
import { sendEmail } from '../utils/sendMail.js';
//import { link } from 'joi';
// import pkg from 'joi';
// const { link } = pkg;
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

export const requestResetPassword = async email => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    }
  );

  const resetPwdTemplatePath = path.join(
    TEMPLATE_DIR,
    'reset-password-email.html'
  );

  const templateSource = (await fs.readFile(resetPwdTemplatePath)).toString();


  const template = handlebars.compile(templateSource);
  const resetUrl = `http://mariannahon.github.io/project-successful-minds-07/reset-password?token=${resetToken}`;
  const html = template({
    name: user?.name,
    link: resetUrl
    //`https://mariannahon.github.io/project-successful-minds-07/reset-password?token=${resetToken}`,


  });


  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};
// ______________________________________

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};

import createHttpError from 'http-errors';
import { refreshUser, signin, signup } from '../services/auth.js';
import {
  createAccessToken,
  createRefreshToken,
} from '../utils/createTokens.js';
import { MAX_REFRESH_TOKEN_AGE } from '../constants/index.js';

export const signupController = async (req, res) => {
  const user = await signup(req.body);

  if (!user) {
    return createHttpError(404, 'User not found');
  }

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
  });

  res.json({
    status: 201,
    msg: 'User was created',
    data: {
      user,
      accessToken,
    },
  });
};

export const signinController = async (req, res) => {
  const { email, password } = req.body;

  const user = await signin(email, password);

  if (!user) {
    return createHttpError(401, 'Credentials is incorrect');
  }
  const refreshToken = createRefreshToken(user._id);
  const accessToken = createAccessToken(user._id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + MAX_REFRESH_TOKEN_AGE),
  });

  res.json({
    status: 200,
    msg: 'Successfully logged in user',
    data: {
      user,
      accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  res.status(204).send();
};

export const refreshUserController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.json({
      status: 401,
      msg: 'Refresh token not found',
    });
  }

  const tokens = await refreshUser(refreshToken);

  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + MAX_REFRESH_TOKEN_AGE),
  });

  res.json({
    status: 200,
    msg: 'User successfully is refresh',
    data: {
      accessToken: tokens.newAccessToken,
    },
  });
};

import { MAX_TOKEN_AGE } from '../constants/index.js';
import { signup } from '../services/auth.js';
import { createToken } from '../utils/createToken.js';

export const signupController = async (req, res) => {
  const user = await signup(req.body);

  const token = createToken(user._id);

  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(Date.now() + MAX_TOKEN_AGE),
  });

  res.json({
    status: 201,
    msg: 'User was created',
    data: user,
  });
};

export const signinController = async (req, res) => {};

export const logoutController = async (req, res) => {};

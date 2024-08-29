import { signup } from '../services/auth.js';

export const signupController = async (req, res) => {
  const user = await signup(req.body);

  res.json({
    status: 201,
    msg: 'User was created',
    data: user,
  });
};

export const signinController = async (req, res) => {};

export const logoutController = async (req, res) => {};

import Joi from 'joi';

export const signupUserSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

export const signinUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

import Joi from 'joi';

export const registerForm = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

export const loginForm = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(64).required(),
  });

  export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
  });

  export const resetPasswordSchema = Joi.object({
    password: Joi.string().min(8).max(64).required(),
    token: Joi.string().required(),
  });

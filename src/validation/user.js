import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(32),
  email: Joi.string().email(),
  oldPassword: Joi.string().min(8).max(64),
  password: Joi.string().min(8).max(64).messages({
    'string.min': 'Password should be at least {#limit} characters',
    'string.max': 'Password should be at most {#limit} characters',
  }),
  gender: Joi.string().valid('male', 'female'),
  waterRate: Joi.number().min(1).max(15000).required(),
});

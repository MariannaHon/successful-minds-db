import Joi from 'joi';

export const waterRate = Joi.object({
    waterRate: Joi.number().min(1).max(15000).required(),
});

export const waterNotes = Joi.object({
    waterVolume: Joi.number().min(1).max(5000).required(),
    date: Joi.date().format('YYYY-MM-DD HH:mm'),
});

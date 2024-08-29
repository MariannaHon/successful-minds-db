import Joi from 'joi';

export const waterNotes = Joi.object({
    waterVolume: Joi.number().min(1).max(5000).required(),
    date: Joi.date().format('YYYY-MM-DD HH:mm'),
});

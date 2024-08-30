import Joi from 'joi';

export const waterNotes = Joi.object({
    amount: Joi.number().min(10).max(5000).required(),
    time: Joi.date().format('YYYY-MM-DD HH:mm'),
});

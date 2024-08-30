import Joi from 'joi';

export const waterNotes = Joi.object({
    amount: Joi.number().min(2).max(7).required(),
    time: Joi.date().format('YYYY-MM-DD HH:mm'),
});

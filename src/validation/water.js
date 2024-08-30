
import Joi from 'joi';
import JoiDate from '@joi/date';

const ExtendedJoi = Joi.extend(JoiDate);

const addWaterErrorMessages = {
    'number.base': 'Field {#label} must be a number.',
    'string.empty': 'Field {#label} cannot be empty.',
    'any.required': 'missing required {#label} field',
};


export const createWaterSchema = Joi.object({
    amount: Joi.number().min(10).max(5000).required().messages(addWaterErrorMessages),
    time: ExtendedJoi.date().format('YYYY-MM-DD HH:mm').messages(addWaterErrorMessages),
});

export const updateWaterSchema = Joi.object({
    amount: Joi.number().min(10).max(5000),
    time: ExtendedJoi.date().format('YYYY-MM-DD HH:mm'),
});

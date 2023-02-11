import joi from 'joi';

export const postCustomerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/, { name: 'numbers' }).required(),
    cpf: joi.string().min(11).max(11).pattern(/^[0-9]+$/, { name: 'numbers' }).required(),
    birthday: joi.string().isoDate().required()
});
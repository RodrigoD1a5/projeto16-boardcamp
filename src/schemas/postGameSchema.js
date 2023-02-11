import joi from "joi";

export const postGameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number().min(0).not(0).required(),
    pricePerDay: joi.number().min(0).not(0).required()
});
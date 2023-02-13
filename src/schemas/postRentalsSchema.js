import joi from "joi";

export const postRentalSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().min(0).not(0).required(),
});
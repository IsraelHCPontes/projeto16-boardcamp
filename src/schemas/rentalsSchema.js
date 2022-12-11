import Joi from "joi";

const rentalsSchema = Joi.object({
    customerId:  Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().min(0).required()
});

export default rentalsSchema;
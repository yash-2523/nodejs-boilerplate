import * as Joi from 'joi'

export const headerValidationSchema = Joi.object({
    "authorization": Joi.string().pattern(/^Bearer\s/).required(),
    "apppubkey": Joi.string().required(),
    "typeOfLogin": Joi.string()
}).unknown()
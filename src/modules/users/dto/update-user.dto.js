import Joi from 'joi'
export const UpdateUserDto = Joi.object({
    name: Joi.string().max(50).required(),
    birth: Joi.date().iso().optional()
})
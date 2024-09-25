import Joi from 'joi'
export const CreateUserDto = Joi.object({
    name: Joi.string().max(50).required(),
    birth: Joi.date().iso().optional()
})
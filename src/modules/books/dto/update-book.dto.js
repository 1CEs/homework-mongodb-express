import Joi from 'joi'
export const UpdateBookDto = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().optional().default("annonymous")
})
import Joi from 'joi'

const CreateRiderSchema = Joi.object({
   email: Joi.string()
      .email({
         minDomainSegments: 2,
         tlds: { allow: ['com', 'net'] },
      })
      .required(),
   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
   currentUbication: Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
   }).required(),
})

const CreatePaymentMethodSchema = Joi.object({
   cardToken: Joi.string().required(),
})

export { CreateRiderSchema, CreatePaymentMethodSchema }

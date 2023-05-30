import Joi from 'joi'

const CreateRideSchema = Joi.object({
   paymentMethodId: Joi.string().required(),
})

const FinishARideSchema = Joi.object({
   rideId: Joi.string().required(),
   destination: Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
   }).required(),
})


export { CreateRideSchema, FinishARideSchema }

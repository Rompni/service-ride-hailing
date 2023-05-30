import { PaymentMethodService } from '../services/payment-method.service'
import { RiderService } from '../services/rider.service'
import { WompiService } from '../services/wompi.service'
import { IRequest } from '../utils/interfaces'
import { CreatePaymentMethodSchema, CreateRiderSchema } from './rider.dto'
import { Request, Response } from 'express'

export class RiderController {
   constructor(
      private readonly riderService: RiderService,
      private readonly wompiService: WompiService,
      private readonly paymentMethodService: PaymentMethodService
   ) {
      this.riderService = riderService
      this.wompiService = wompiService
      this.paymentMethodService = paymentMethodService
   }

   async createRider(req: Request, res: Response): Promise<void> {
      try {
         const body = req.body

         const value = await CreateRiderSchema.validateAsync(body)

         const { email, password, currentUbication } = req.body

         const rider = await this.riderService.createRider(
            email,
            password,
            currentUbication
         )

         res.status(201).json({ rider })
      } catch (error: any) {
         console.log(error)
         res.status(500).json({ error: error.message })
      }
   }

   async createAPaymentMethod(req: IRequest, res: Response): Promise<void> {
      try {
         const { userId: user_id } = req.user as any

         const body = req.body

         const value = await CreatePaymentMethodSchema.validateAsync(body)

         const { cardToken } = req.body

         const rider = await this.riderService.findRiderById(user_id)

         if (!rider) throw new Error('Rider not found')

         const { user, userId } = rider
         const { email } = user

         const acceptance_token = await this.wompiService.getAcceptanceToken()

         if (!acceptance_token)
            throw new Error('Error getting the acceptance token')

         const paymentMethodByWompi =
            await this.wompiService.createPaymentMethod(
               cardToken,
               email,
               acceptance_token
            )

         if (!paymentMethodByWompi)
            throw new Error('Error creating the payment method')

         const { id, type, token } = paymentMethodByWompi.data

         const paymentMethod =
            await this.paymentMethodService.savePaymentMethod(
               type,
               userId,
               token,
               id
            )

         if (!paymentMethod) throw new Error('Error saving the payment method')

         res.status(201).json({ paymentMethod })
      } catch (error: any) {
         console.log(error)
         res.status(500).json({ error: error.message })
      }
   }
}

import { RideService } from '../services/ride.service'
import { Request, Response } from 'express'
import { CreateRideSchema, FinishARideSchema } from './ride.dto'
import { IRequest } from '../utils/interfaces'
import { WompiService } from '../services/wompi.service'
import { TransactionService } from '../services/transaction.service'

export class RideController {
   constructor(
      private readonly rideService: RideService,
      private readonly wompiService: WompiService,
      private readonly transactionService: TransactionService
   ) {
      this.rideService = rideService
      this.wompiService = wompiService
      this.transactionService = transactionService
   }

   async requestARide(req: IRequest, res: Response): Promise<void> {
      try {
         const body = req.body

         const { userId } = req.user as any

         const value = await CreateRideSchema.validateAsync(body)

         const { paymentMethodId } = body

         const ride = await this.rideService.requestARide(
            paymentMethodId,
            userId
         )

         if (!ride) throw new Error('Ride not created')

         res.status(201).json({ ride })
      } catch (error: any) {
         console.log(error)
         res.status(500).json({ error: error.message })
      }
   }

   async finishARide(req: IRequest, res: Response): Promise<void> {
      try {
         const body = req.body

         const value = await FinishARideSchema.validateAsync(body)

         const { rideId, destination } = body

         const returnFinishARide = await this.rideService.finishARide(
            rideId,
            destination
         )

         if (!returnFinishARide) throw new Error('Error finishing a ride')

         const transactionWompi = await this.wompiService.createATransaction({
            ...returnFinishARide,
         })

         if (!transactionWompi) throw new Error('Error creating a transaction')

         const transaction = await this.transactionService.createTransaction(
            rideId,
            transactionWompi
         )

         if (!transaction) throw new Error('Error creating a transaction')

         res.status(201).json({ transaction, success: true })
      } catch (error: any) {
         console.log(error)
         res.status(500).json({ error: error.message })
      }
   }
}

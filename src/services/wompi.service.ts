import { WompiRepository } from '../repositories/wompi.repository'
import { IReturnFinishARide } from '../utils/interfaces'

export class WompiService {
   constructor(private readonly wompiRepository: WompiRepository) {
      this.wompiRepository = wompiRepository
   }

   async getAcceptanceToken(): Promise<any> {
      const acceptanceToken = await this.wompiRepository.getAcceptationToken()

      if (!acceptanceToken)
         throw new Error('Error getting the acceptation token')

      return acceptanceToken
   }

   async createPaymentMethod(
      token: string,
      customer_email: string,
      acceptance_token: string
   ): Promise<any> {
      const paymentMethod = await this.wompiRepository.createPaymentMethod(
         token,
         customer_email,
         acceptance_token
      )

      if (!paymentMethod) throw new Error('Error creating the payment method')

      return paymentMethod
   }

   async createATransaction(data: IReturnFinishARide): Promise<any> {
      const transaction = await this.wompiRepository.createATransaction({
         ...data,
         currency: "COP",
         payment_method: {
            "installments": 2,
          },

      })

      if (!transaction) throw new Error('Error creating the transaction')

      return transaction
   }
}

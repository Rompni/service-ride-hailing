import { PaymentMethodEntity } from '../models/payment-method.entity'
import { PaymentMethodRepository } from '../repositories/payment-method.repository'
import { PaymentMethodTypeEnum } from '../utils/enums'

export class PaymentMethodService {
   constructor(
      private readonly paymentMethodRepository: PaymentMethodRepository
   ) {
      this.paymentMethodRepository = paymentMethodRepository
   }

   async savePaymentMethod(
      type: PaymentMethodTypeEnum,
      userId: string,
      tokenizedPayment: string,
      paymentSourceId: number
   ): Promise<PaymentMethodEntity> {
      const paymentMethod =
         await this.paymentMethodRepository.savePaymentMethod(
            type,
            userId,
            tokenizedPayment,
            paymentSourceId
         )

      if (!paymentMethod) throw new Error('Payment method not saved')

      return paymentMethod
   }
}

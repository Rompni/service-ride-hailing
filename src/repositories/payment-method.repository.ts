import { DataSource } from 'typeorm'
import { AppDataSource } from '../database/data-source'
import { PaymentMethodTypeEnum } from '../utils/enums'
import { PaymentMethodEntity } from '../models/payment-method.entity'

export class PaymentMethodRepository {
   private readonly datasource: DataSource

   constructor() {
      this.datasource = AppDataSource
   }

   async savePaymentMethod(
      type: PaymentMethodTypeEnum,
      userId: string,
      tokenizedPayment: string,
      paymentSourceId: number
   ): Promise<PaymentMethodEntity> {
      const paymentMethod = await this.datasource
         .getRepository(PaymentMethodEntity)
         .save({
            type,
            userId,
            tokenizedPayment,
            paymentSourceId,
         })

      return paymentMethod
   }
}

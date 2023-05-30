import { DataSource } from 'typeorm'
import { AppDataSource } from '../database/data-source'

export class TransactionRepository {
   private readonly datasource: DataSource

   constructor() {
      this.datasource = AppDataSource
   }

   async createTransaction(rideId: string, dataWompi: any) {
      const { amount_in_cents, reference, currency, status, status_message } =
         dataWompi.data

      const transaction = await this.datasource
         .getRepository('TransactionEntity')
         .save({
            rideId,
            amount_in_cents,
            reference,
            currency,
            status,
            status_message,
         })

      if (!transaction) throw new Error('Transaction not created')

      return transaction
   }
}

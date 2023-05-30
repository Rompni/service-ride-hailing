import { TransactionRepository } from '../repositories/transaction.repository'

export class TransactionService {
   constructor(private readonly transactionRepository: TransactionRepository) {
      this.transactionRepository = transactionRepository
   }

   async createTransaction(
      rideId: string,
      transactionWompi: any
   ): Promise<any> {
      const transaction = await this.transactionRepository.createTransaction(
         rideId,
         transactionWompi
      )

      if (!transaction) throw new Error('Transaction not created')

      return transaction
   }
}

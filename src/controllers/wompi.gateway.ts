import { ICreateAWompiTransaction } from '../utils/interfaces'

export interface WompiAPI {
   getAcceptationToken(): Promise<string>
   createPaymentMethod(
      token: string,
      customer_email: string,
      acceptance_token: string
   ): Promise<any>
   createATransaction(data: ICreateAWompiTransaction): Promise<any>
}

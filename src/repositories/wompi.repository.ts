import config from 'config'
import axios from 'axios'
import { ICreateAWompiTransaction } from '../utils/interfaces'
import { WompiAPI } from '../controllers/wompi.gateway'

export class WompiRepository implements WompiAPI {
   private readonly publicKey: string
   private readonly privateKey: string
   private readonly baseUrl: string

   constructor() {
      const wompiConfig = config.get<{
         publicKey: string
         privateKey: string
         baseUrl: string
      }>('wompiConfig')

      this.publicKey = wompiConfig.publicKey
      this.privateKey = wompiConfig.privateKey
      this.baseUrl = wompiConfig.baseUrl
   }

   async getAcceptationToken(): Promise<any> {
      const response = await axios.get(
         `${this.baseUrl}/merchants/${this.publicKey}`
      )

      if (response.status !== 200)
         throw new Error('Error getting the acceptation token')

      const { acceptance_token } = response.data.data.presigned_acceptance

      return acceptance_token
   }

   async createPaymentMethod(
      token: string,
      customer_email: string,
      acceptance_token: string
   ): Promise<any> {
      const response = await axios.post(
         `${this.baseUrl}/payment_sources/`,
         {
            type: 'CARD',
            token,
            customer_email,
            acceptance_token,
         },
         {
            headers: {
               Authorization: `Bearer ${this.privateKey}`,
               'Content-Type': 'application/json',
            },
         }
      )

      if (response.status !== 201)
         throw new Error('Error creating the payment method')

      return response.data
   }

   async createATransaction(data: ICreateAWompiTransaction): Promise<any> {
      const response = await axios.post(
         `${this.baseUrl}/transactions/`,
         {
            ...data,
         },
         {
            headers: {
               Authorization: `Bearer ${this.privateKey}`,
               'Content-Type': 'application/json',
            },
         }
      )

      if (response.status !== 201)
         throw new Error('Error creating the transaction')

      return response.data
   }
}

import { Request } from 'express'

interface ILatLong {
   lat: number
   long: number
}

interface IRequest extends Request {
   user?: any
}

interface IReturnFinishARide {
   amount_in_cents: number
   payment_source_id: number
   customer_email: string
   reference: string
}
interface ICreateAWompiTransaction extends IReturnFinishARide  {
   currency: string
   payment_method: {
      installments: number,
   },
}

export { ILatLong, IRequest,IReturnFinishARide, ICreateAWompiTransaction }

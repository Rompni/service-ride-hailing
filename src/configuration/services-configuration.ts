import { DriverRepository } from '../repositories/driver.repository'
import { PaymentMethodRepository } from '../repositories/payment-method.repository'
import { RideRepository } from '../repositories/ride.repository'
import { RiderRepository } from '../repositories/rider.repository'
import { TransactionRepository } from '../repositories/transaction.repository'
import { UserRepository } from '../repositories/user.repository'
import { WompiRepository } from '../repositories/wompi.repository'
import { AuthService } from '../services/auth.service'
import { DriverService } from '../services/driver.service'
import { PaymentMethodService } from '../services/payment-method.service'
import { RideService } from '../services/ride.service'
import { RiderService } from '../services/rider.service'
import { TransactionService } from '../services/transaction.service'
import { WompiService } from '../services/wompi.service'

class ServicesConfiguration {
   static getDriverService(driverRepository: DriverRepository): DriverService {
      return new DriverService(driverRepository)
   }

   static getRiderService(riderRepository: RiderRepository): RiderService {
      return new RiderService(riderRepository)
   }

   static getWompiService(wompiRepository: WompiRepository): WompiService {
      return new WompiService(wompiRepository)
   }

   static getPaymentMethodService(
      paymentMethodRepository: PaymentMethodRepository
   ): PaymentMethodService {
      return new PaymentMethodService(paymentMethodRepository)
   }

   static getAuthService(userRepository: UserRepository): AuthService {
      return new AuthService(userRepository)
   }

   static getRideService(rideRepository: RideRepository): RideService {
      return new RideService(rideRepository)
   }

   static getTransactionService(transactionService: TransactionRepository): TransactionService {
      return new TransactionService(transactionService)
   }
}

export default ServicesConfiguration

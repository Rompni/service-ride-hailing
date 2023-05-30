import { AuthController } from '../controllers/auth.controller'
import { DriverController } from '../controllers/driver.controller'
import { RideController } from '../controllers/ride.controller'
import { RiderController } from '../controllers/rider.controller'
import { AuthService } from '../services/auth.service'
import { DriverService } from '../services/driver.service'
import { PaymentMethodService } from '../services/payment-method.service'
import { RideService } from '../services/ride.service'
import { TransactionService } from '../services/transaction.service'
import { WompiService } from '../services/wompi.service'
import { RiderService } from './../services/rider.service'

class ControllerConfiguration {
   static getDriverController(driverService: DriverService): DriverController {
      return new DriverController(driverService)
   }

   static getRiderController(
      riderService: RiderService,
      wompiService: WompiService,
      paymentMethodService: PaymentMethodService
   ): RiderController {
      return new RiderController(
         riderService,
         wompiService,
         paymentMethodService
      )
   }

   static getAuthController(authService: AuthService): AuthController {
      return new AuthController(authService)
   }

   static getRideController(
      rideService: RideService,
      wompiService: WompiService,
      transactionService: TransactionService
   ): RideController {
      return new RideController(rideService, wompiService, transactionService)
   }
}

export default ControllerConfiguration

import { DriverRepository } from '../repositories/driver.repository'
import ControllerConfiguration from './controllers-configuration'
import ProjectConfiguration, { AppConfig } from './project-configutation'
import RouterConfiguration from './routers-configuration'
import { RiderRepository } from './../repositories/rider.repository'
import ServicesConfiguration from './services-configuration'
import { WompiRepository } from '../repositories/wompi.repository'
import { PaymentMethodRepository } from '../repositories/payment-method.repository'
import { UserRepository } from './../repositories/user.repository'
import { RideRepository } from '../repositories/ride.repository'
import { TransactionRepository } from '../repositories/transaction.repository'

require('dotenv').config()
export async function main(): Promise<void> {
   /**
    * Repositories
    */

   const driverRepository = new DriverRepository()
   const riderRepository = new RiderRepository()
   const wompiRepository = new WompiRepository()
   const paymentMethodRepository = new PaymentMethodRepository()
   const userRepository = new UserRepository()
   const rideRepository = new RideRepository()
   const transactionRepository = new TransactionRepository()

   /**
    * Services
    */
   const driverService =
      ServicesConfiguration.getDriverService(driverRepository)

   const riderService = ServicesConfiguration.getRiderService(riderRepository)

   const wompiService = ServicesConfiguration.getWompiService(wompiRepository)

   const paymentMethodService = ServicesConfiguration.getPaymentMethodService(
      paymentMethodRepository
   )
   const authService = ServicesConfiguration.getAuthService(userRepository)

   const rideService = ServicesConfiguration.getRideService(rideRepository)

   const transactionService = ServicesConfiguration.getTransactionService(
      transactionRepository
   )

   /**
    * Controllers
    */
   const driverController =
      ControllerConfiguration.getDriverController(driverService)

   const riderController = ControllerConfiguration.getRiderController(
      riderService,
      wompiService,
      paymentMethodService
   )

   const authController = ControllerConfiguration.getAuthController(authService)

   const rideController = ControllerConfiguration.getRideController(
      rideService,
      wompiService,
      transactionService
   )

   /**
    * Routers
    */
   const mainRouter = RouterConfiguration.getMainRouter(
      driverController,
      riderController,
      authController,
      rideController
   )

   /**
    * Express
    */
   const expressApp = ProjectConfiguration.getExpressApp(
      {} as AppConfig,
      mainRouter
   )

   expressApp.boot()
}

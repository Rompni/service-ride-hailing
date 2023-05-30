import { Router } from 'express'
import { DriverController } from '../controllers/driver.controller'
import { RiderController } from '../controllers/rider.controller'
import { AuthController } from '../controllers/auth.controller'
import { authenticateToken } from '../middlewares/authtoken'
import { ValidateRolDriver, ValidateRolRider } from '../middlewares/validateRol'
import { RideController } from '../controllers/ride.controller'

export class MainRouter {
   private router: Router

   constructor(
      private readonly driverController: DriverController,
      private readonly riderController: RiderController,
      private readonly authController: AuthController,
      private readonly rideController: RideController
   ) {
      this.driverController = driverController
      this.riderController = riderController
      this.authController = authController
      this.rideController = rideController

      this.router = Router()
      this.configRouter()
   }

   configRouter(): void {
      this.router.post(
         '/api/v1/rider/payment-method',
         authenticateToken,
         ValidateRolRider,
         this.riderController.createAPaymentMethod.bind(this.riderController)
      )

      this.router.post(
         '/api/v1/ride/',
         authenticateToken,
         ValidateRolRider,
         this.rideController.requestARide.bind(this.rideController)
      )

      this.router.post(
         '/api/v1/ride/finish',
         authenticateToken,
         ValidateRolDriver,
         this.rideController.finishARide.bind(this.rideController)
      )

      this.router.post(
         '/api/v1/auth/login',
         this.authController.login.bind(this.authController)
      )
   }

   getRouter(): Router {
      return this.router
   }
}

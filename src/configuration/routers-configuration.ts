import { MainRouter } from '../routes/router'
import { DriverController } from './../controllers/driver.controller'
import { RiderController } from './../controllers/rider.controller'
import { AuthController } from './../controllers/auth.controller'
import { RideController } from '../controllers/ride.controller'

class RouterConfiguration {
   static getMainRouter(
      driverController: DriverController,
      riderController: RiderController,
      authController: AuthController,
      rideController: RideController
   ): MainRouter {
      return new MainRouter(
         driverController,
         riderController,
         authController,
         rideController
      )
   }
}

export default RouterConfiguration

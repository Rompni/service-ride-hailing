import { RideRepository } from '../repositories/ride.repository'
import { ILatLong, IReturnFinishARide } from '../utils/interfaces'

export class RideService {
   constructor(private readonly rideRepository: RideRepository) {
      this.rideRepository = rideRepository
   }

   async requestARide(paymentMethodId: string, userId: string): Promise<any> {
      const ride = await this.rideRepository.requestARide(
         paymentMethodId,
         userId
      )

      if (!ride) throw new Error('Ride not created')

      return ride
   }

   async finishARide(
      ride_id: string,
      final_location: ILatLong
   ): Promise<IReturnFinishARide> {
      const finishARideReturn = await this.rideRepository.finishARide(
         ride_id,
         final_location
      )

      if (!finishARideReturn) throw new Error('Ride not finished')

      return finishARideReturn
   }
}

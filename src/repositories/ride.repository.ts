import { DataSource } from 'typeorm'
import { AppDataSource } from '../database/data-source'
import { RideEntity } from '../models/ride.entity'
import { RiderEntity } from '../models/rider.entity'
import { DriverEntity } from '../models/driver.entity'
import {
   DefaultFeesInCentosEnum,
   StatusEnumType,
   StatusRideTypeEnum,
} from '../utils/enums'
import { PaymentMethodEntity } from './../models/payment-method.entity'
import { ILatLong, IReturnFinishARide } from '../utils/interfaces'

export class RideRepository {
   private readonly datasource: DataSource

   constructor() {
      this.datasource = AppDataSource
   }

   async requestARide(paymentMethodId: string, userId: string): Promise<any> {
      const rider = await this.datasource
         .getRepository(RiderEntity)
         .findOneOrFail({
            where: { userId },
            select: ['id', 'currentUbication'],
         })

      const driver = await this.datasource
         .getRepository(DriverEntity)
         .findOneOrFail({
            where: { status: StatusEnumType.AVAILABLE },
            select: ['id'],
         })

      const paymentMethod = await this.datasource
         .getRepository(PaymentMethodEntity)
         .findOneOrFail({
            where: { id: paymentMethodId },
            select: ['id', 'type'],
         })

      const ride = await this.datasource.getRepository(RideEntity).save({
         riderId: rider.id,
         driverId: driver.id,
         origin: rider.currentUbication,
         paymentMethodId: paymentMethod.id,
         paymentMethodType: paymentMethod.type,
         status: StatusRideTypeEnum.INPROGRESS,
      })

      if (!ride) throw new Error('Ride not created')

      // update driver status
      await this.datasource.getRepository(DriverEntity).save({
         id: driver.id,
         status: StatusEnumType.ONARIDE,
      })

      // update rider status
      await this.datasource.getRepository(RiderEntity).save({
         id: rider.id,
         status: StatusEnumType.ONARIDE,
      })

      return ride
   }

   async finishARide(
      ride_id: string,
      final_location: ILatLong
   ): Promise<IReturnFinishARide> {
      const ride = await this.datasource
         .getRepository(RideEntity)
         .findOneOrFail({
            where: { id: ride_id },
            select: ['id', 'driverId', 'riderId', 'paymentMethodId', 'origin'],
         })

      const distance = Math.floor(
         Math.sqrt(
            Math.pow(ride.origin.lat - final_location.lat, 2) +
               Math.pow(ride.origin.long - final_location.long, 2)
         )
      )

      const duration = Math.floor(Math.random() * (60 - 5) + 5)

      const price = Math.floor(
         distance * DefaultFeesInCentosEnum.PRICE_PER_KM +
            duration * DefaultFeesInCentosEnum.PRICE_PER_MINUTES +
            DefaultFeesInCentosEnum.BASE_PRICE
      )

      // update ride
      const rideUpdated = await this.datasource.getRepository(RideEntity).save({
         id: ride.id,
         destination: final_location,
         status: StatusRideTypeEnum.FINISHED,
         distance,
         duration,
         amount_in_cents: price,
      })

      // update driver status
      await this.datasource.getRepository(DriverEntity).save({
         id: ride.driverId,
         status: StatusEnumType.AVAILABLE,
      })

      // update rider status
      await this.datasource.getRepository(RiderEntity).save({
         id: ride.riderId,
         status: StatusEnumType.AVAILABLE,
      })

      const paymentMethod = await this.datasource
         .getRepository(PaymentMethodEntity)
         .findOneOrFail({
            where: { id: ride.paymentMethodId },
            select: ['id', 'type', 'paymentSourceId'],
         })

      const rider = await this.datasource
         .getRepository(RiderEntity)
         .findOneOrFail({
            where: { id: ride.riderId },
            select: ['id', 'user'],
            relations: ['user'],
         })

      return {
         amount_in_cents: price,
         payment_source_id: paymentMethod.paymentSourceId,
         customer_email: rider.user.email,
         reference: Math.random().toString(36).substring(2, 35),
      }
   }
}

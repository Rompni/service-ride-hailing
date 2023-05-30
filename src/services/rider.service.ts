import { RiderEntity } from '../models/rider.entity'
import { RiderRepository } from '../repositories/rider.repository'
import { ILatLong } from '../utils/interfaces'

export class RiderService {
   constructor(private readonly riderRepository: RiderRepository) {
      this.riderRepository = riderRepository
   }

   async createRider(
      email: string,
      password: string,
      currentUbication: ILatLong
   ): Promise<RiderEntity> {
      const rider = await this.riderRepository.createRider(
         email,
         password,
         currentUbication
      )

      if (!rider) throw new Error('Rider not created')

      return rider
   }

   async findRiderById(id: string): Promise<RiderEntity> {
      const rider = await this.riderRepository.findRiderById(id)

      if (!rider) throw new Error('Rider not found')

      return rider
   }
}

import { DriverEntity } from '../models/driver.entity'
import { DriverRepository } from '../repositories/driver.repository'

export class DriverService {
   constructor(private readonly driverRepository: DriverRepository) {
      this.driverRepository = driverRepository
   }

   async createDriver(email: string, password: string): Promise<DriverEntity> {
      const driver = await this.driverRepository.createDriver(email, password)

      if (!driver) throw new Error('Driver not created')

      return driver
   }
}

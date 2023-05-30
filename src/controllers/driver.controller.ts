import { Request, Response } from 'express'
import { CreateDriverSchema } from './driver.dto'
import { DriverService } from '../services/driver.service'

export class DriverController {
   constructor(private readonly driverService: DriverService) {
      this.driverService = driverService
   }

   async createDriver(req: Request, res: Response): Promise<void> {
      try {
         const body = req.body

         const value = await CreateDriverSchema.validateAsync(body)

         const { email, password } = req.body

         const driver = await this.driverService.createDriver(email, password)

         res.status(201).json({ driver })
      } catch (error: any) {
         console.log(error)
         res.status(500).json({ error: error.message })
      }
   }
}

import { DataSource } from 'typeorm'
import { RoleEnumType } from '../utils/enums'
import { DriverEntity } from '../models/driver.entity'
import { UserEntity } from '../models/user.entity'
import { ILatLong } from '../utils/interfaces'
import { AppDataSource } from '../database/data-source'
import config from 'config'
import bcrypt from 'bcrypt'

export class DriverRepository {
   private readonly datasource: DataSource

   constructor() {
      this.datasource = AppDataSource
   }

   async createDriver(email: string, password: string): Promise<DriverEntity> {
      const queryRunner = this.datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      try {
         const size = parseInt(config.get<string>('salt'))

         const hashedPassword = await bcrypt.hash(password, size)

         // CREATE USER
         const user = await queryRunner.manager.save(UserEntity, {
            email,
            password: hashedPassword,
            role: RoleEnumType.DRIVER,
         })

         if (!user) {
            throw new Error('Error creating a user')
         }

         // CREATE DRIVER
         const driver = await queryRunner.manager.save(DriverEntity, {
            user_id: user.id,
         })

         if (!driver) {
            throw new Error('Error creating a driver')
         }

         await queryRunner.commitTransaction()

         return driver
      } catch (error) {
         await queryRunner.rollbackTransaction()
         throw error
      } finally {
         await queryRunner.release()
      }
   }
   findDriverById(id: string): Promise<any> {
      throw new Error('Method not implemented.')
   }
}

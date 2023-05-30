import { DataSource } from 'typeorm'
import { AppDataSource } from '../database/data-source'
import { RoleEnumType } from '../utils/enums'
import { UserEntity } from '../models/user.entity'
import { RiderEntity } from '../models/rider.entity'
import { ILatLong } from '../utils/interfaces'
import bcrypt from 'bcrypt'
import config from 'config'

export class RiderRepository {
   private readonly datasource: DataSource

   constructor() {
      this.datasource = AppDataSource
   }

   async createRider(
      email: string,
      password: string,
      currentUbication: ILatLong
   ): Promise<any> {
      const queryRunner = this.datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      try {
         // CREATE USER

         const size = parseInt(config.get<string>('salt'))

         const hashedPassword = await bcrypt.hash(password, size)

         const user = await queryRunner.manager.save(UserEntity, {
            email,
            password: hashedPassword,
            role: RoleEnumType.RIDER,
         })

         // CREATE RIDER
         const rider = await queryRunner.manager.save(RiderEntity, {
            userId: user.id,
            currentUbication,
         })

         await queryRunner.commitTransaction()

         return rider
      } catch (error) {
         await queryRunner.rollbackTransaction()
         throw error
      } finally {
         await queryRunner.release()
      }
   }

   findRiderById(id: string): Promise<RiderEntity> {
      const rider = this.datasource.getRepository(RiderEntity).findOneOrFail({
         where: { userId: id },
         relations: ['user'],
      })

      return rider
   }
}

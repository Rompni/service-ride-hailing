import { DataSource } from 'typeorm'
import { AppDataSource } from '../database/data-source'
import bcrypt from 'bcrypt'

export class UserRepository {
   private readonly datasource: DataSource

   constructor() {
      this.datasource = AppDataSource
   }

   async getUserWithEmailPassword(
      email: string,
      password: string
   ): Promise<any> {
      const user = await this.datasource.getRepository('UserEntity').findOne({
         where: { email },
         select: ['id', 'email', 'password', 'role'],
      })

      if (!user) throw new Error('User not found')

      const match = await bcrypt.compare(password, user.password)

      if (!match) throw new Error('Password not match')

      return user
   }
}

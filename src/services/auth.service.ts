import { UserRepository } from '../repositories/user.repository'

export class AuthService {
   constructor(private readonly userRepository: UserRepository) {
      this.userRepository = userRepository
   }

   async login(email: string, password: string): Promise<any> {
      const user = await this.userRepository.getUserWithEmailPassword(
         email,
         password
      )

      if (!user) throw new Error('User not found')

      delete user.password

      return user
   }
}

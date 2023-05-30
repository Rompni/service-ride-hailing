import { AuthService } from '../services/auth.service'
import { Request, Response } from 'express'
import { LoginSchema } from './auth.dto'
import jwt from 'jsonwebtoken'
import config from 'config'

export class AuthController {
   constructor(private readonly authService: AuthService) {
      this.authService = authService
   }

   async login(req: Request, res: Response): Promise<void> {
      try {
         const body = req.body

         const value = await LoginSchema.validateAsync(body)

         const { email, password } = body

         const user = await this.authService.login(email, password)

         if (!user) {
            res.status(400).json({ error: 'email and password not match' })
         }

         let token = jwt.sign(
            {
               userId: user.id,
               role: user.role,
            },
            config.get<string>('jwt'),
            {
               expiresIn: '2h',
            }
         )

         res.status(200).json({ user, token })
      } catch (error: any) {
         console.log(error)
         res.status(500).json({ error: error.message })
      }
   }
}

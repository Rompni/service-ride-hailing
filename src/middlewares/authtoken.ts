import config from 'config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IRequest } from '../utils/interfaces'

function authenticateToken(req: IRequest, res: Response, next: NextFunction) {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]

   if (token == null) return res.sendStatus(401)

   jwt.verify(token, config.get<string>('jwt'), (err: any, user: any) => {
      console.log(err)

      if (err) return res.status(403).json({ error: err.message })

      req.user = user

      next()
   })
}

export { authenticateToken }

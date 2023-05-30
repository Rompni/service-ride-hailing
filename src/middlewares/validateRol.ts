import { NextFunction } from 'express'
import { IRequest } from '../utils/interfaces'
import { Response } from 'express'

function ValidateRolDriver(req: IRequest, res: Response, next: NextFunction) {
   const { role } = req.user

   if (role !== 'driver') return res.status(403).json({ error: 'Forbidden' })

   next()
}

function ValidateRolRider(req: IRequest, res: Response, next: NextFunction) {
   const { role } = req.user

   console.log(req.user)

   if (role !== 'rider') return res.sendStatus(403)

   next()
}

export { ValidateRolDriver, ValidateRolRider }

import { Request, Response, NextFunction } from 'express'
import { NotAuthorized } from '../types'

const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorized('Not authorized')
  }

  next()
}

export default requireAuth

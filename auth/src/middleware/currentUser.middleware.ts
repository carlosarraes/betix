import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/token'
import { UserAttrs } from '../types'

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserAttrs
    }
  }
}

const currentUser = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.session?.jwt) return next()

  try {
    const payload = verifyToken(req.session.jwt, process.env.JWT_KEY!) as UserAttrs

    req.currentUser = payload
  } catch (error) {}

  next()
}

export default currentUser
